#!/usr/bin/env zx

import sharp from 'sharp';
import { chalk, fs, glob, os, path } from 'zx';

const VIDEOS_DIR = 'src/assets/videos';
const MOCKUPS_DIR = 'src/assets/images';
const MOCKUP_WIDTH = 480;
const MOCKUP_QUALITY = 60;

// Configurações de compressão de vídeo (H.264)
const VIDEO_CRF = 28;       // quanto maior, mais compressão (0–51, 23 é default)
const VIDEO_PRESET = 'fast'; // ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];

async function getVideos() {
  const allFiles = await glob(`${VIDEOS_DIR}/*`, { onlyFiles: true });
  return allFiles
    .filter(f => VIDEO_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map(f => ({
      path: f,
      name: path.basename(f, path.extname(f)),
      ext: path.extname(f).toLowerCase(),
    }));
}

/**
 * Extrai o primeiro frame do vídeo e gera uma imagem WebP de baixa qualidade
 * como mockup/placeholder.
 */
async function generateMockup(videoPath, baseName) {
  const outputPath = path.join(MOCKUPS_DIR, `${baseName}-mockup.webp`);
  const tmpFrame = path.join(os.tmpdir(), `${baseName}-frame.png`);

  try {
    // Extrai o primeiro frame como PNG temporário
    await $`ffmpeg -y -i ${videoPath} -vframes 1 -vcodec png ${tmpFrame}`;

    // Redimensiona e converte para WebP com qualidade reduzida
    await sharp(tmpFrame)
      .resize(MOCKUP_WIDTH, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: MOCKUP_QUALITY })
      .toFile(outputPath);

    // Remove o arquivo temporário
    await fs.unlink(tmpFrame).catch(() => { });

    return { success: true, outputPath };
  }
  catch (error) {
    await fs.unlink(tmpFrame).catch(() => { });
    return { success: false, error: error.message };
  }
}

/**
 * Minifica o vídeo usando ffmpeg com codec H.264 e CRF alto
 * para reduzir o tamanho do arquivo. Substitui o original pelo minificado.
 */
async function minifyVideo(videoPath, baseName, ext) {
  const tmpPath = path.join(os.tmpdir(), `${baseName}-minified${ext}`);

  try {
    // Minifica para um arquivo temporário
    await $`ffmpeg -y -i ${videoPath} -c:v libx264 -crf ${VIDEO_CRF} -preset ${VIDEO_PRESET} -c:a aac -b:a 128k -movflags +faststart ${tmpPath}`;

    // Substitui o original pelo minificado
    await fs.unlink(videoPath);
    await fs.move(tmpPath, videoPath);

    return { success: true, outputPath: videoPath };
  }
  catch (error) {
    await fs.unlink(tmpPath).catch(() => { });
    return { success: false, error: error.message };
  }
}

/**
 * Remove vídeos residuais com sufixo -min de execuções anteriores.
 */
async function cleanupMinFiles() {
  const minFiles = await glob(`${VIDEOS_DIR}/*-min.*`, { onlyFiles: true });
  let count = 0;

  for (const file of minFiles) {
    try {
      await fs.unlink(file);
      count++;
    }
    catch (error) {
      console.log(chalk.red(`   ❌ Erro ao remover ${path.basename(file)}: ${error.message}`));
    }
  }

  return count;
}

async function main() {
  console.log(chalk.blue('🎬 Iniciando otimização de vídeos...\n'));

  // Garante que o diretório de saída dos mockups existe
  await fs.ensureDir(MOCKUPS_DIR);

  // Remove arquivos -min residuais de execuções anteriores
  const cleaned = await cleanupMinFiles();
  if (cleaned > 0) {
    console.log(chalk.yellow(`🧹 Removidos ${cleaned} arquivo(s) -min residual(is)\n`));
  }

  const videos = await getVideos();

  if (videos.length === 0) {
    console.log(chalk.yellow(`⚠️  Nenhum vídeo encontrado em ${VIDEOS_DIR}`));
    console.log(chalk.gray('   Coloque os vídeos nessa pasta e execute o script novamente.'));
    return;
  }

  console.log(chalk.gray(`📁 Encontrados ${videos.length} vídeo(s) em ${VIDEOS_DIR}\n`));

  const stats = {
    mockups: 0,
    minified: 0,
    errors: 0,
  };

  for (const video of videos) {
    console.log(chalk.blue(`🎞️  Processando: ${video.name}${video.ext}`));

    // Gera mockup do primeiro frame
    const mockupResult = await generateMockup(video.path, video.name);
    if (mockupResult.success) {
      console.log(chalk.green(`   🖼️  Mockup gerado: ${path.basename(mockupResult.outputPath)}`));
      stats.mockups++;
    }
    else {
      console.log(chalk.red(`   ❌ Erro no mockup: ${mockupResult.error}`));
      stats.errors++;
    }

    // Minifica o vídeo
    const minifyResult = await minifyVideo(video.path, video.name, video.ext);
    if (minifyResult.success) {
      console.log(chalk.green(`   📦 Vídeo minificado: ${path.basename(minifyResult.outputPath)}`));
      stats.minified++;
    }
    else {
      console.log(chalk.red(`   ❌ Erro na minificação: ${minifyResult.error}`));
      stats.errors++;
    }
  }

  console.log(chalk.blue('\n📊 Resumo:'));
  console.log(chalk.green(`   🖼️  Mockups gerados: ${stats.mockups}`));
  console.log(chalk.green(`   📦 Vídeos minificados: ${stats.minified}`));

  if (stats.errors > 0) {
    console.log(chalk.red(`   ❌ Erros: ${stats.errors}`));
  }

  console.log(chalk.green('\n✨ Otimização de vídeos concluída!'));
}

main().catch((error) => {
  console.error(chalk.red(`Erro fatal: ${error.message}`));
  process.exit(1);
});
