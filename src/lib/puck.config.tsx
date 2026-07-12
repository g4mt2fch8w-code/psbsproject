import { Config, DropZone } from '@measured/puck'
import React from 'react'

import { ImageField } from '@/lib/cms-fields/ImageField'
import { LinkField } from '@/lib/cms-fields/LinkField'

import { Hero, HeroProps } from '@/components/site/Hero'
import { Mission, MissionProps } from '@/components/site/Mission'
import { Impact, ImpactProps } from '@/components/site/Impact'
import { Wildlife, WildlifeProps } from '@/components/site/Wildlife'
import { Forests, ForestsProps } from '@/components/site/Forests'
import { DataViz, DataVizProps } from '@/components/site/DataViz'
import { Timeline, TimelineProps } from '@/components/site/Timeline'
import { Testimonials } from '@/components/site/Testimonials'
import { Journal } from '@/components/site/Journal'
import { Partners } from '@/components/site/Partners'
import { Join } from '@/components/site/Join'

export type PuckProps = {
  Section: { 
    paddingTop: string, 
    paddingBottom: string 
  }
  Heading: { title: string }
  Text: { text: string, align: 'text-left' | 'text-center' | 'text-right' }
  Button: { label: string, href: string, variant: string }
  Image: { url: string, alt: string, borderRadius: string }
  Columns: { columns: number }
  HeroTemplate: HeroProps
  MissionTemplate: MissionProps
  ImpactTemplate: ImpactProps
  WildlifeTemplate: WildlifeProps
  ForestsTemplate: ForestsProps
  DataVizTemplate: DataVizProps
  TimelineTemplate: TimelineProps
  TestimonialsTemplate: {}
  JournalTemplate: {}
  PartnersTemplate: {}
  JoinTemplate: {}
}

export const puckConfig: Config<PuckProps> = {
  components: {
    Section: {
      fields: {
        paddingTop: { type: 'text' },
        paddingBottom: { type: 'text' }
      },
      defaultProps: {
        paddingTop: '64px',
        paddingBottom: '64px'
      },
      render: ({ paddingTop, paddingBottom }) => {
        return (
          <section style={{ paddingTop, paddingBottom }}>
            <DropZone zone="content" />
          </section>
        )
      }
    },
    Heading: {
      fields: {
        title: { type: 'text' }
      },
      defaultProps: {
        title: 'Section Heading'
      },
      render: ({ title }) => (
        <h2 className="text-3xl md:text-5xl font-bold font-display my-4">{title}</h2>
      )
    },
    Text: {
      fields: {
        text: { type: 'textarea' },
        align: {
          type: 'select',
          options: [
            { label: 'Left', value: 'text-left' },
            { label: 'Center', value: 'text-center' },
            { label: 'Right', value: 'text-right' }
          ]
        }
      },
      defaultProps: {
        text: 'Enter your text here...',
        align: 'text-left'
      },
      render: ({ text, align }) => (
        <p className={`text-lg leading-relaxed mb-4 ${align}`}>{text}</p>
      )
    },
    Button: {
      fields: {
        label: { type: 'text', label: 'Button Text' },
        href: { 
          type: 'custom', 
          label: 'Button Link',
          render: ({ value, onChange }) => <LinkField value={value} onChange={onChange} />
        },
        variant: {
          type: 'select',
          options: [
            { label: 'Primary (Green)', value: 'bg-primary text-primary-foreground' },
            { label: 'Secondary (Light)', value: 'bg-secondary text-secondary-foreground' },
            { label: 'Outline (Border)', value: 'border-2 border-primary text-primary' },
          ]
        }
      },
      defaultProps: {
        label: 'Click Me',
        href: '/',
        variant: 'bg-primary text-primary-foreground'
      },
      render: ({ label, href, variant }) => (
        <div className="my-4">
          <a href={href} className={`px-6 py-3 rounded-full font-bold inline-block transition hover:opacity-90 ${variant}`}>
            {label}
          </a>
        </div>
      )
    },
    Image: {
      fields: {
        url: { 
          type: 'custom',
          label: 'Upload Photo',
          render: ({ value, onChange }) => <ImageField value={value} onChange={onChange} />
        },
        alt: { type: 'text', label: 'Description (for screen readers)' },
        borderRadius: { type: 'text', label: 'Corner Roundness' }
      },
      defaultProps: {
        url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
        alt: 'Nature',
        borderRadius: '1rem'
      },
      render: ({ url, alt, borderRadius }) => (
        <img src={url} alt={alt} style={{ borderRadius }} className="w-full h-auto object-cover my-4 shadow-xl" />
      )
    },
    Columns: {
      fields: {
        columns: {
          type: 'number',
          label: 'Number of Columns'
        }
      },
      defaultProps: {
        columns: 2
      },
      render: ({ columns }) => {
        return (
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(columns, 4)} gap-8 my-4`}>
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i}>
                <DropZone zone={`column-${i}`} />
              </div>
            ))}
          </div>
        )
      }
    },
    HeroTemplate: { 
      fields: {
        organizationName: { type: 'text', label: 'Organization Name (Small text)' },
        description: { type: 'textarea', label: 'Main Description' },
        primaryButtonText: { type: 'text', label: 'Primary Button Text' },
        primaryButtonLink: { 
          type: 'custom', 
          label: 'Primary Button Link',
          render: ({ value, onChange }) => <LinkField value={value} onChange={onChange} />
        },
        secondaryButtonText: { type: 'text', label: 'Secondary Button Text' },
        secondaryButtonLink: { 
          type: 'custom', 
          label: 'Secondary Button Link',
          render: ({ value, onChange }) => <LinkField value={value} onChange={onChange} />
        },
        titleWords: {
          type: 'array',
          label: 'Large Title Words',
          getItemSummary: (item, i) => item.word || `Word ${i}`,
          arrayFields: {
            word: { type: 'text', label: 'Word' }
          }
        }
      },
      render: (props: any) => {
         const mappedTitleWords = props.titleWords ? props.titleWords.map((w: any) => w.word) : undefined;
         return <Hero {...props} titleWords={mappedTitleWords} />
      }
    },
    MissionTemplate: {
      fields: {
        eyebrow: { type: 'text', label: 'Small Top Label' },
        headingPart1: { type: 'text', label: 'Main Title (Part 1)' },
        headingHighlight1: { type: 'text', label: 'Golden Highlight 1' },
        headingPart2: { type: 'text', label: 'Main Title (Part 2)' },
        headingHighlight2: { type: 'text', label: 'Golden Highlight 2' },
        headingPart3: { type: 'text', label: 'Main Title (Part 3)' },
        imageSrc: { 
          type: 'custom', 
          label: 'Main Photo',
          render: ({ value, onChange }) => <ImageField value={value} onChange={onChange} />
        },
        imageAlt: { type: 'text', label: 'Photo Description' },
        imageOverlaySubtitle: { type: 'text', label: 'Photo Overlay Top Text' },
        imageOverlayTitle: { type: 'text', label: 'Photo Overlay Large Text' },
        paragraphs: {
          type: 'array',
          label: 'Description Paragraphs',
          getItemSummary: (item, i) => item.text ? item.text.substring(0, 20) + '...' : `Paragraph ${i}`,
          arrayFields: { text: { type: 'textarea', label: 'Paragraph Text' } }
        },
        pillarsData: {
          type: 'array',
          label: 'Mission Pillars',
          getItemSummary: (item, i) => item.title || `Pillar ${i}`,
          arrayFields: {
            title: { type: 'text', label: 'Pillar Title' },
            body: { type: 'textarea', label: 'Pillar Description' },
            iconName: { 
              type: 'select', 
              label: 'Icon',
              options: [{label: 'Leaf/Sprout', value: 'Sprout'}, {label: 'Eye (Vision)', value: 'Eye'}, {label: 'People/Users', value: 'Users'}] 
            }
          }
        }
      },
      render: (props: any) => {
        const paragraphs = props.paragraphs ? props.paragraphs.map((p: any) => p.text) : undefined;
        return <Mission {...props} paragraphs={paragraphs} />
      }
    },
    ImpactTemplate: {
      fields: {
        eyebrow: { type: 'text', label: 'Small Top Label' },
        headingPart1: { type: 'text', label: 'Main Title (Part 1)' },
        headingHighlight: { type: 'text', label: 'Golden Highlight' },
        headingPart2: { type: 'text', label: 'Main Title (Part 2)' },
        statsData: {
          type: 'array',
          label: 'Statistics',
          getItemSummary: (item, i) => item.label || `Stat ${i}`,
          arrayFields: {
            label: { type: 'text', label: 'Statistic Label (e.g. Villages)' },
            stringValue: { type: 'text', label: 'Text Value (e.g. 50+)' },
            value: { type: 'number', label: 'Number Value (for animation)' },
            suffix: { type: 'text', label: 'Suffix (e.g. +, k)' }
          }
        }
      },
      render: (props) => <Impact {...props} />
    },
    WildlifeTemplate: {
      fields: {
        eyebrow: { type: 'text', label: 'Small Top Label' },
        headingPart1: { type: 'text', label: 'Main Title (Part 1)' },
        headingHighlight: { type: 'text', label: 'Golden Highlight' },
        headingPart2: { type: 'text', label: 'Main Title (Part 2)' },
        description: { type: 'textarea', label: 'Description Text' },
        species: {
          type: 'array',
          label: 'Wildlife Species',
          getItemSummary: (item, i) => item.name || `Species ${i}`,
          arrayFields: {
            img: { 
              type: 'custom', 
              label: 'Species Photo',
              render: ({ value, onChange }) => <ImageField value={value} onChange={onChange} />
            },
            status: { type: 'text', label: 'Conservation Status (e.g. Endangered)' },
            latin: { type: 'text', label: 'Latin/Scientific Name' },
            name: { type: 'text', label: 'Common Name' },
            body: { type: 'textarea', label: 'Description' }
          }
        }
      },
      render: (props) => <Wildlife {...props} />
    },
    ForestsTemplate: {
      fields: {
        eyebrow: { type: 'text', label: 'Small Top Label' },
        headingPart1: { type: 'text', label: 'Main Title (Part 1)' },
        headingHighlight: { type: 'text', label: 'Golden Highlight' },
        headingPart2: { type: 'text', label: 'Main Title (Part 2)' },
        description: { type: 'textarea', label: 'Description' },
        bgImage: { 
          type: 'custom', 
          label: 'Background Photo',
          render: ({ value, onChange }) => <ImageField value={value} onChange={onChange} />
        },
        mapImage: { 
          type: 'custom', 
          label: 'Map Image',
          render: ({ value, onChange }) => <ImageField value={value} onChange={onChange} />
        },
        mapCaption: { type: 'text', label: 'Map Caption Text' },
        reserves: {
          type: 'array',
          label: 'Map Markers (Reserves)',
          getItemSummary: (item, i) => item.name || `Marker ${i}`,
          arrayFields: {
            name: { type: 'text', label: 'Reserve Name' },
            area: { type: 'text', label: 'Area/Size Text' },
            x: { type: 'number', label: 'Left Position % (0-100)' },
            y: { type: 'number', label: 'Top Position % (0-100)' }
          }
        }
      },
      render: (props) => <Forests {...props} />
    },
    DataVizTemplate: {
      fields: {
        eyebrow: { type: 'text', label: 'Small Top Label' },
        headingPart1: { type: 'text', label: 'Main Title (Part 1)' },
        headingHighlight: { type: 'text', label: 'Golden Highlight' },
        headingPart2: { type: 'text', label: 'Main Title (Part 2)' },
        treesRestoredTitle: { type: 'text', label: 'Chart Title' },
        treesRestoredValue: { type: 'text', label: 'Chart Value' },
        treesRestoredBadge: { type: 'text', label: 'Chart Badge (e.g. +38% YoY)' },
        treesGrowthData: {
          type: 'array',
          label: 'Chart Data Points',
          getItemSummary: (item, i) => `Data point ${i + 1}: ${item.value}`,
          arrayFields: { value: { type: 'number', label: 'Number Value' } }
        },
        wildlifeCensusTitle: { type: 'text', label: 'Bars Title' },
        wildlifeCensusSubtitle: { type: 'text', label: 'Bars Subtitle' },
        wildlifeData: {
          type: 'array',
          label: 'Bars Data',
          getItemSummary: (item, i) => item.label || `Wildlife ${i}`,
          arrayFields: {
            label: { type: 'text', label: 'Label (e.g. Tigers)' },
            value: { type: 'number', label: 'Current Value' },
            max: { type: 'number', label: 'Max Value (for bar width)' },
            color: { type: 'text', label: 'Bar Color (Hex Code)' }
          }
        }
      },
      render: (props: any) => {
        const growthData = props.treesGrowthData 
          ? props.treesGrowthData.map((d: any) => d.value) 
          : undefined;
        return <DataViz {...props} treesGrowthData={growthData} />
      }
    },
    TimelineTemplate: {
      fields: {
        eyebrow: { type: 'text', label: 'Small Top Label' },
        headingPart1: { type: 'text', label: 'Main Title (Part 1)' },
        headingHighlight: { type: 'text', label: 'Golden Highlight' },
        headingPart2: { type: 'text', label: 'Main Title (Part 2)' },
        description: { type: 'textarea', label: 'Description' },
        milestonesData: {
          type: 'array',
          label: 'Timeline Events',
          getItemSummary: (item, i) => item.year ? `${item.year}: ${item.title}` : `Event ${i}`,
          arrayFields: {
            year: { type: 'text', label: 'Year or Date' },
            title: { type: 'text', label: 'Event Title' },
            body: { type: 'textarea', label: 'Event Description' }
          }
        }
      },
      render: (props) => <Timeline {...props} />
    },
    TestimonialsTemplate: { render: () => <Testimonials /> },
    JournalTemplate: { render: () => <Journal /> },
    PartnersTemplate: { render: () => <Partners /> },
    JoinTemplate: { render: () => <Join /> }
  }
}
