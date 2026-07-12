export const defaultHomeLayout = {
  content: [
    { type: 'HeroTemplate', props: {
      id: 'hero',
      organizationName: 'Paryavaran Sanrakshan Bahuddeshiya Sanstha',
      titleWords: [
        { word: 'Protecting' }, { word: 'Forests.' }, { word: 'Preserving' }, { word: 'Futures.' }
      ],
      description: 'A movement born in the wild heart of Bhandara — restoring forests, protecting wildlife, and walking alongside the communities who call these lands home.',
      primaryButtonText: 'Begin the Journey',
      primaryButtonLink: '#mission',
      secondaryButtonText: 'Donate & Support',
      secondaryButtonLink: '/donate'
    }},
    { type: 'MissionTemplate', props: {
      id: 'mission',
      eyebrow: 'Our Mission',
      headingPart1: "We don't just ",
      headingHighlight1: 'protect',
      headingPart2: ' nature.\nWe ',
      headingHighlight2: 'become',
      headingPart3: ' it.',
      paragraphs: [
        { text: "From the central forests of Maharashtra to the tiger corridors of Vidarbha, PSBS works at the intersection of science, community, and reverence." },
        { text: "We were founded in 2022 by forest-edge communities who understood that conservation cannot be imported—it must be grown locally. Today, 132 villages partner with us." },
        { text: "Our approach is deliberately slow and local. We do not chase headlines; we chase sapling survival rates, tiger pugmarks in wet clay." }
      ],
      pillarsData: [
        { title: 'Restore', body: "Native species reforestation across Vidarbha's degraded landscapes.", iconName: 'Sprout' },
        { title: 'Protect', body: 'Wildlife monitoring, rescue and anti-poaching field operations.', iconName: 'Eye' },
        { title: 'Engage', body: 'Forest-edge communities, schools and indigenous guardians.', iconName: 'Users' }
      ],
      imageOverlaySubtitle: 'A single seed',
      imageOverlayTitle: 'becomes the breath of generations.'
    }},
    { type: 'TimelineTemplate', props: { id: 'timeline' } },
    { type: 'ImpactTemplate', props: {
      id: 'impact',
      eyebrow: 'Measured in Heartbeats',
      headingPart1: 'Conservation, in ',
      headingHighlight: 'numbers',
      headingPart2: ' that breathe.',
      statsData: [
        { label: 'Native Trees Restored', stringValue: 'Banyan, Neem, Pipal...' },
        { label: 'Hectares Protected', stringValue: 'A lot of :)' },
        { label: 'Wildlife Initiatives', value: 150, suffix: '+' },
        { label: 'Villages Engaged', value: 250, suffix: '+' },
        { label: 'Camera Traps', value: 160, suffix: '+' },
        { label: 'Species Documented', stringValue: '~200' }
      ]
    }},
    { type: 'WildlifeTemplate', props: { id: 'wildlife' } },
    { type: 'ForestsTemplate', props: { id: 'forests' } },
    { type: 'DataVizTemplate', props: { id: 'dataviz' } },
    { type: 'TestimonialsTemplate', props: { id: 'testimonials' } },
    { type: 'JournalTemplate', props: { id: 'journal' } },
    { type: 'PartnersTemplate', props: { id: 'partners' } },
    { type: 'JoinTemplate', props: { id: 'join' } }
  ],
  root: { props: { title: 'Home' } },
  zones: {}
}

export const defaultLayouts: Record<string, any> = {
  home: defaultHomeLayout,
  about: {
    content: [
      { type: 'HeroTemplate', props: { id: 'about-hero', titleWords: [{word: "About"}, {word: "Us"}], description: "Learn more about our organization and our mission." } },
      { type: 'MissionTemplate', props: { id: 'about-mission', headingPart1: "Our", headingHighlight: "History", headingPart2: "and Vision" } },
      { type: 'TimelineTemplate', props: { id: 'about-timeline' } }
    ],
    root: { props: { title: 'About Us' } },
    zones: {}
  },
  wildlife: {
    content: [
      { type: 'WildlifeTemplate', props: { id: 'wildlife-section', eyebrow: "Wildlife", headingPart1: "Explore the", headingHighlight: "Species", headingPart2: "of Vidarbha" } }
    ],
    root: { props: { title: 'Wildlife' } },
    zones: {}
  },
  projects: {
    content: [
      { type: 'DataVizTemplate', props: { id: 'projects-dataviz', headingPart1: "Our", headingHighlight: "Impact", headingPart2: "in Numbers" } },
      { type: 'ImpactTemplate', props: { id: 'projects-impact' } }
    ],
    root: { props: { title: 'Projects' } },
    zones: {}
  },
  news: {
    content: [
      { type: 'JournalTemplate', props: { id: 'news-journal', headingPart1: "Latest", headingHighlight: "News", headingPart2: "& Updates" } }
    ],
    root: { props: { title: 'News' } },
    zones: {}
  },
  contact: {
    content: [
      { type: 'HeroTemplate', props: { id: 'contact-hero', titleWords: [{word: "Contact"}, {word: "Us"}], description: "Get in touch with our team." } },
      { type: 'JoinTemplate', props: { id: 'contact-join' } }
    ],
    root: { props: { title: 'Contact' } },
    zones: {}
  },
  donate: {
    content: [
      { type: 'HeroTemplate', props: { id: 'donate-hero', titleWords: [{word: "Support"}, {word: "Us"}], description: "Your donation helps us protect the forests." } },
      { type: 'ImpactTemplate', props: { id: 'donate-impact' } }
    ],
    root: { props: { title: 'Donate' } },
    zones: {}
  },
  volunteer: {
    content: [
      { type: 'HeroTemplate', props: { id: 'volunteer-hero', titleWords: [{word: "Join"}, {word: "Us"}], description: "Become a volunteer and make a difference." } },
      { type: 'JoinTemplate', props: { id: 'volunteer-join' } }
    ],
    root: { props: { title: 'Volunteer' } },
    zones: {}
  }
}
