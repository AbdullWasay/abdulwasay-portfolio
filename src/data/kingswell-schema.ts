/** Derived from Kingswell/src/lib/types.ts + content-store pattern */
export const kingswellSchema = {
  modelCount: 9,
  provider: "MongoDB Atlas",
  domains: [
    {
      label: "CMS content",
      models: ["SiteConfig", "Property", "BlogPost", "Testimonial", "TeamMember", "AreaGuide", "WhyChooseItem", "CoverageAreas"],
      relations: ["Content → SiteConfig", "Content → Property[]", "Content → BlogPost[]", "Content → Testimonial[]", "Content → TeamMember[]", "Content → AreaGuide[]"],
      mermaid: `erDiagram
  CONTENT {
    string key PK
    json data
    date updatedAt
  }
  SITE_CONFIG {
    string agencyName
    string slogan
    string phone
    string email
    json openingHours
    json socialLinks
  }
  PROPERTY {
    string id PK
    string slug UK
    string type
    string title
    string address
    number price
    int bedrooms
    int bathrooms
    string status
    json images
  }
  BLOG_POST {
    string slug PK
    string title
    string excerpt
    date publishedAt
    string body
  }
  TESTIMONIAL {
    string id PK
    string name
    string text
    int rating
    date date
  }
  TEAM_MEMBER {
    string id PK
    string name
    string role
    string bio
    string image
  }
  AREA_GUIDE {
    string slug PK
    string name
    string tagline
    string overview
    json schools
    json transport
  }
  CONTENT ||--o| SITE_CONFIG : site
  CONTENT ||--o{ PROPERTY : properties
  CONTENT ||--o{ BLOG_POST : blog
  CONTENT ||--o{ TESTIMONIAL : testimonials
  CONTENT ||--o{ TEAM_MEMBER : team
  CONTENT ||--o{ AREA_GUIDE : areas`,
    },
    {
      label: "Leads & enquiries",
      models: ["LeadSubmission"],
      relations: ["LeadSubmission → Property", "LeadSubmission → Resend", "LeadSubmission → CRM webhook"],
      mermaid: `erDiagram
  LEAD_SUBMISSION {
    string id PK
    string formType
    string firstName
    string lastName
    string email
    string phone
    string message
    string propertyTitle
    date receivedAt
    string source
  }
  PROPERTY {
    string slug PK
    string title
  }
  LEAD_SUBMISSION }o--o| PROPERTY : viewingInterest`,
    },
    {
      label: "AI chat context",
      models: ["ChatSession", "SiteConfig", "Property"],
      relations: ["ChatSession → Gemini", "ChatSession → SiteConfig", "ChatSession → Property"],
      mermaid: `erDiagram
  CHAT_SESSION {
    json messageHistory
    string model
  }
  SITE_CONFIG {
    string agencyName
    string phone
    json coverageAreas
  }
  PROPERTY {
    string slug PK
    string title
    string status
    string priceLabel
  }
  CHAT_SESSION }o--|| SITE_CONFIG : promptContext
  CHAT_SESSION }o--o{ PROPERTY : publishedListings
  note for CHAT_SESSION "Gemini 2.5 Flash — live MongoDB context only"`,
    },
  ],
} as const;
