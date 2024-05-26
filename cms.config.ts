import { defineConfig, defineFileCollection, defineFileCollectionEntry, defineFolderCollection, defineImageWidget, defineListWidget, defineMarkdownWidget, defineObjectWidget, defineStringWidget, defineNumberWidget, defineFileWidget, defineDateTimeWidget } from "@caiquecamargo/vite-plugin-netlify-cms";

const createLocalizedField = (widget: any) => {
  return [
    widget,
    {
      ...widget,
      name: `${widget.name}_en`,
      label: `${widget.label} (Inglês)`,
    },
    {
      ...widget,
      name: `${widget.name}_es`,
      label: `${widget.label} (Espanhol)`,
    },
  ]
}

const products = defineFolderCollection({
  name: 'products',
  label: 'Produtos',
  folder: 'src/content/products',
  extension: 'md',
  label_singular: 'Produto',
  create: true,
  delete: true,
  editor: {
    preview: false,
  },
  fields: [
    ...createLocalizedField(
      defineStringWidget({
        name: 'title',
        label: 'Título',
        required: true,
      }),
    ),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'body',
        label: 'Descrição',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      }),
    ),
    ...createLocalizedField(
      defineListWidget({
        name: 'applications',
        label: 'Aplicações (seperadas por vírgula, ex. "Aplicação 1, Aplicação 2")',
        allow_add: true,
        label_singular: 'Aplicação',
        required: true,
      }),
    ),
    defineNumberWidget({
      name: 'position',
      label: 'Posição',
      min: 1,
      default: 100,
    }),
    defineStringWidget({
      name: 'youtube',
      label: 'Link do Youtube (pode ser apenas o ID)',
      required: false,
    }),
    defineListWidget({
      name: 'manuals',
      label: 'Manuais',
      required: false,
      allow_add: true,
      fields: [
        defineStringWidget({ name: 'title', label: 'Título', required: true }),
        defineFileWidget({
          name: 'link',
          label: 'Manual',
          required: true,
          allow_multiple: false,
          media_folder: '/public/assets/manuals',
          media_library: {
            config: {
              multiple: false
            }
          }
        }),
      ]
    }),
    defineImageWidget({
      name: 'images',
      allow_multiple: true,
      label: 'Imagens',
      required: true,
      media_folder: '/src/assets/images',
      public_folder: '../../assets/images',
      media_library: {
        config: {
          multiple: true,
        }
      }
    } as any),
    defineListWidget({
      name: 'subproducts',
      label: 'Subprodutos',
      allow_add: true,
      label_singular: 'Subproduto',
      required: false,
      fields: [
          ...createLocalizedField(
            defineStringWidget({ name: 'title', label: 'Título', required: true }),
          ),
          ...createLocalizedField(
            defineStringWidget({ name: 'description', label: 'Descrição', required: false }),
          ),
          defineStringWidget({
            name: 'youtube',
            label: 'Link do Youtube (pode ser apenas o ID)',
            required: false,
          }),
          defineImageWidget({ 
            name: 'images', 
            label: 'Imagems', 
            required: true, 
            allow_multiple: true,
            media_folder: '/src/assets/images',
            public_folder: '../../assets/images',
            media_library: {
              config: {
                multiple: true,
              }
            }
          } as any),
        ]
    })
  ]
})

const homePage = defineFileCollectionEntry({
  name: 'home',
  label: 'Página inicial',
  file: 'src/content/home/index.md',
  delete: false,
  extension: 'md',
  editor: {
    preview: false,
  },
  fields: [
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'title',
        label: 'Título',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    defineImageWidget({
      name: 'titleBackground',
      label: 'Imagem de fundo do título',
      required: true,
      allow_multiple: false
    }),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'description',
        label: 'Descrição',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    defineImageWidget({
      name: 'descriptionBackgrounds',
      label: 'Imagem da descrição',
      required: true,
      allow_multiple: true,
      media_library: {
        config: {
          multiple: true
        }
      }
    }),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'clients',
        label: 'Clientes',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    defineImageWidget({
      name: 'images',
      allow_multiple: true,
      label: 'Logo dos clients',
      media_library: {
        config: {
          multiple: true
        }
      }
    }),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'testimonialsTitle',
        label: 'Depoimentos - título',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    defineListWidget({
      name: 'testimonials',
      label: 'Depoimentos',
      allow_add: true,
      fields: [
        defineStringWidget({
          name: 'name',
          label: 'Nome',
          required: false,
        }),
        ...createLocalizedField(
          defineMarkdownWidget({
            name: 'testimonial',
            label: 'Depoimento',
            editor_components: [],
            modes: ["rich_text"],
            required: true,
          })
        )
      ]
    })
  ]
});

const aboutPage = defineFileCollectionEntry({
  name: 'about',
  label: 'Página sobre',
  file: 'src/content/about/index.md',
  delete: false,
  extension: 'md',
  editor: {
    preview: false,
  },
  fields: [
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'title',
        label: 'Título',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    defineImageWidget({
      name: 'titleBackground',
      label: 'Imagem de fundo do título',
      required: true,
      allow_multiple: false
    }),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'description',
        label: 'Descrição',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'mission',
        label: 'Missão',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'vision',
        label: 'Visão',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'values',
        label: 'Valores',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'dna',
        label: 'Nosso DNA',
        editor_components: [],
        modes: ["rich_text"],
        required: true,
      })
    ),
    defineListWidget({
      name: 'dnas',
      label: 'DNAs',
      allow_add: true,
      max: 5,
      min: 5,
      fields: [
        ...createLocalizedField(
          defineStringWidget({
            name: 'title',
            label: 'Título',
            required: true,
          })
        ),
        defineImageWidget({
          name: 'image',
          label: 'Imagem',
          required: true,
          allow_multiple: false
        })
      ]
    })
  ]
})

const pages = defineFileCollection({
  name: 'pages',
  label: 'Configuração das páginas',
  files: [
    homePage,
    aboutPage
  ]
})

const config = defineFileCollection({
  name: 'config',
  label: 'Configurações gerais',
  files: [
    defineFileCollectionEntry({
      name: 'config',
      label: 'Configurações gerais',
      file: 'src/content/config/index.md',
      editor: {
        preview: false,
      },
      extension: 'md',
      fields: [
        defineStringWidget({
          name: 'email',
          label: 'Email',
          required: true,
        }),
        defineStringWidget({
          name: 'phone',
          label: 'Telefone',
          required: true,
        }),
        defineObjectWidget({
          name: 'whatsapp',
          label: 'Whatsapp',
          required: true,
          fields: [
            defineStringWidget({
              name: 'number',
              label: 'Número',
              required: true,
            }),
            defineStringWidget({
              name: 'message',
              label: 'Mensagem',
              required: true,
            }),
          ]
        }),
        defineObjectWidget({
          name: 'address',
          label: 'Endereço',
          fields: [
            defineStringWidget({
              name: 'address',
              label: 'Endereço',
              required: true,
            }),
            defineStringWidget({
              name: 'maps',
              label: 'Link do Google Maps',
              required: true,
            }),
          ]
        }),
        defineObjectWidget({
          name: 'instagram',
          label: 'Instagram',
          required: true,
          fields: [
            defineStringWidget({
              name: 'url',
              label: 'URL',
              required: true,
            }),
            defineStringWidget({
              name: 'arroba',
              label: 'Arroba',
              required: true,
            }),
          ]
        }),
        defineObjectWidget({
          name: 'facebook',
          label: 'Facebook',
          required: true,
          fields: [
            defineStringWidget({
              name: 'url',
              label: 'URL',
              required: true,
            }),
            defineStringWidget({
              name: 'arroba',
              label: 'Arroba',
              required: true,
            }),
          ]
        }),
        defineObjectWidget({
          name: 'linkedin',
          label: 'Linkedin',
          fields: [
            defineStringWidget({
              name: 'url',
              label: 'URL',
              required: true,
            }),
            defineStringWidget({
              name: 'arroba',
              label: 'Arroba',
              required: true,
            }),
          ]
        })
      ]
    })
  ]
});

const blogCollection = defineFolderCollection({
  name: 'blog',
  label: 'Blog',
  folder: 'src/content/blog',
  create: true,
  delete: true,
  label_singular: 'Post',
  editor: {
    preview: false,
  },
  slug: '{{year}}-{{month}}-{{day}}-{{fields.title}}',
  fields: [
    ...createLocalizedField(
      defineStringWidget({
        name: 'title',
        label: 'Título',
        required: true,
      }),
    ),
    ...createLocalizedField(
      defineMarkdownWidget({
        name: 'body',
        label: 'Conteúdo',
        required: true,
        editor_components: [],
        buttons: ["bold", "italic", "link", "heading-two", "heading-three"],
        modes: ["rich_text"],
      }),
    ),
    defineImageWidget({
      name: 'images',
      allow_multiple: true,
      label: 'Imagens',
      required: false,
      media_folder: '/src/assets/images',
      public_folder: '../../assets/images',
      media_library: {
        config: {
          multiple: true,
        }
      }
    } as any),
    defineDateTimeWidget({
      name: 'date',
      label: 'Data',
      required: true,

      date_format: 'YYYY-MM-DD',
      time_format: 'HH:mm',
      format: 'YYYY-MM-DD HH:mm',
      
    }),
  ]
})

export default defineConfig({
  local_backend: true,
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  locale: 'pt',
  media_folder: 'src/assets/images',
  public_folder: '../../assets/images',

  collections: [
    products,
    pages,
    blogCollection,
    config
  ],
})