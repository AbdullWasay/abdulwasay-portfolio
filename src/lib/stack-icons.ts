import { techBySlug, techIconUrl } from "@/data/portfolio";
import paynetLogo from "@/assets/stack/paynet.png";
import novaPostLogo from "@/assets/stack/novapost.png";
import fanCourierLogo from "@/assets/stack/fan-courier.png";
import antDesignLogo from "@/assets/stack/ant-design.svg";
import zodLogo from "@/assets/stack/zod.svg";
import neonLogo from "@/assets/stack/neon.svg";
import radixUiLogo from "@/assets/stack/radix-ui.svg";
import lenisLogo from "@/assets/stack/lenis.svg";
import emblaLogo from "@/assets/stack/embla.svg";
import lucideLogo from "@/assets/stack/lucide.svg";

type IconEntry = { slug?: string; color?: string; label?: string; iconify?: string; direct?: string[] };

function si(name: string) {
  return `https://cdn.jsdelivr.net/npm/simple-icons@11.18.0/icons/${name}.svg`;
}

function devicon(name: string) {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;
}

/** Reliable direct URLs — tried first */
const DIRECT: Record<string, string[]> = {
  vercel: [devicon("vercel"), si("vercel"), "https://api.iconify.design/logos:vercel-icon.svg"],
  stripe: [devicon("stripe"), si("stripe"), "https://api.iconify.design/logos:stripe.svg"],
  "remove.bg": [si("removebg"), "https://api.iconify.design/mdi:image-auto-adjust.svg?color=%237c3aed"],
};

const ALIASES: Record<string, IconEntry> = {
  "next.js": {
    slug: "nextdotjs",
    label: "Next.js",
    direct: [
      "https://cdn.simpleicons.org/nextdotjs/000000",
      "https://api.iconify.design/simple-icons:nextdotjs.svg?color=%23000000",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    ],
  },
  react: { slug: "react", label: "React", direct: [devicon("react"), si("react")] },
  typescript: { slug: "typescript", label: "TypeScript", direct: [devicon("typescript"), si("typescript")] },
  "tailwind css": { slug: "tailwindcss", label: "Tailwind CSS", direct: [devicon("tailwindcss"), si("tailwindcss")] },
  redux: { slug: "redux", label: "Redux", direct: [devicon("redux"), si("redux")] },
  prisma: {
    slug: "prisma",
    label: "Prisma",
    direct: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      "https://api.iconify.design/simple-icons:prisma.svg?color=%232D3748",
      "https://cdn.simpleicons.org/prisma/2D3748",
    ],
  },
  postgresql: { slug: "postgresql", label: "PostgreSQL", direct: [devicon("postgresql"), si("postgresql")] },
  neon: { label: "Neon", direct: [neonLogo, si("neon"), "https://cdn.simpleicons.org/neon/00E599"] },
  "neon postgresql": { label: "Neon PostgreSQL", direct: [neonLogo, si("neon"), "https://cdn.simpleicons.org/neon/00E599"] },
  "neon db": { label: "Neon", direct: [neonLogo, si("neon")] },
  node: { slug: "nodedotjs", label: "Node.js", direct: [devicon("nodejs"), si("nodedotjs")] },
  "node.js": { slug: "nodedotjs", label: "Node.js", direct: [devicon("nodejs"), si("nodedotjs")] },
  "next.js api": { slug: "nextdotjs", label: "Next.js API", direct: [devicon("nextjs"), si("nextdotjs")] },
  vercel: {
    label: "Vercel",
    direct: [
      "https://cdn.simpleicons.org/vercel/000000",
      "https://api.iconify.design/simple-icons:vercel.svg?color=%23000000",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
    ],
  },
  aws: {
    label: "AWS",
    direct: [
      "https://api.iconify.design/logos:aws.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      "https://api.iconify.design/mdi:aws.svg?color=%23FF9900",
    ],
  },
  "aws s3": {
    label: "AWS S3",
    direct: [
      "https://api.iconify.design/logos:aws-s3.svg",
      "https://api.iconify.design/logos:aws.svg",
      "https://api.iconify.design/mdi:aws.svg?color=%23FF9900",
    ],
  },
  docker: {
    slug: "docker",
    label: "Docker",
    direct: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      "https://cdn.simpleicons.org/docker/2496ED",
      "https://api.iconify.design/logos:docker-icon.svg",
    ],
  },
  git: {
    slug: "git",
    label: "Git",
    direct: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      "https://cdn.simpleicons.org/git/F05032",
      "https://api.iconify.design/logos:git-icon.svg",
    ],
  },
  mysql: {
    slug: "mysql",
    label: "MySQL",
    direct: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      "https://cdn.simpleicons.org/mysql/4479A1",
      "https://api.iconify.design/logos:mysql.svg",
    ],
  },
  stripe: { label: "Stripe", direct: DIRECT.stripe },
  firebase: { slug: "firebase", label: "Firebase", direct: [devicon("firebase"), si("firebase")] },
  python: { slug: "python", label: "Python", direct: [devicon("python"), si("python")] },
  vitest: { slug: "vitest", label: "Vitest", direct: [devicon("vitest"), si("vitest")] },
  zod: { label: "Zod", direct: [zodLogo, si("zod"), "https://cdn.simpleicons.org/zod/3E67B1"] },
  three: { slug: "threedotjs", label: "Three.js", direct: [devicon("threejs"), si("threedotjs")] },
  "three.js": { slug: "threedotjs", label: "Three.js", direct: [devicon("threejs"), si("threedotjs")] },
  recharts: { slug: "recharts", label: "Recharts", direct: [si("recharts")] },
  google: { slug: "google", label: "Google", direct: [devicon("google"), si("google")] },
  "google gemini": {
    slug: "googlegemini",
    label: "Google Gemini",
    direct: [
      "https://cdn.simpleicons.org/googlegemini/8E75B2",
      "https://api.iconify.design/simple-icons:googlegemini.svg?color=%238E75B2",
      si("googlegemini"),
    ],
  },
  gemini: {
    slug: "googlegemini",
    label: "Gemini",
    direct: [
      "https://cdn.simpleicons.org/googlegemini/8E75B2",
      "https://api.iconify.design/simple-icons:googlegemini.svg?color=%238E75B2",
    ],
  },
  "ant design": { label: "Ant Design", direct: [antDesignLogo, si("antdesign"), "https://cdn.simpleicons.org/antdesign/017CF8"] },
  antdesign: { label: "Ant Design", direct: [antDesignLogo, si("antdesign")] },
  paynet: { label: "Paynet", direct: [paynetLogo] },
  "nova post": { label: "Nova Post", direct: [novaPostLogo] },
  novapost: { label: "Nova Post", direct: [novaPostLogo] },
  "fan courier": { label: "FAN Courier", direct: [fanCourierLogo] },
  mongodb: { slug: "mongodb", label: "MongoDB", direct: [devicon("mongodb"), si("mongodb")] },
  "mongodb atlas": { slug: "mongodb", label: "MongoDB Atlas", direct: [devicon("mongodb"), si("mongodb")] },
  cloudinary: { slug: "cloudinary", label: "Cloudinary", direct: [si("cloudinary"), "https://cdn.simpleicons.org/cloudinary/3448C5"] },
  "framer motion": { slug: "framer", color: "ffffff", label: "Framer Motion", direct: [devicon("framermotion"), si("framer")] },
  flutter: { slug: "flutter", label: "Flutter", direct: [devicon("flutter"), si("flutter")] },
  dart: { slug: "dart", label: "Dart", direct: [devicon("dart"), si("dart")] },
  yolo: {
    label: "YOLO",
    direct: [
      "https://api.iconify.design/simple-icons:ultralytics.svg?color=%23111F68",
      "https://cdn.simpleicons.org/ultralytics/111F68",
      si("pytorch"),
    ],
  },
  flask: { slug: "flask", label: "Flask", color: "ffffff", direct: [devicon("flask"), si("flask")] },
  pytorch: { slug: "pytorch", label: "PyTorch", direct: [devicon("pytorch"), si("pytorch")] },
  tensorflow: { slug: "tensorflow", label: "TensorFlow", direct: [devicon("tensorflow"), si("tensorflow")] },
  "google colab": { label: "Google Colab", direct: [si("googlecolab"), "https://cdn.simpleicons.org/googlecolab/F9AB00"] },
  ultralytics: { label: "YOLO", direct: ["https://cdn.simpleicons.org/ultralytics/111F68"] },
  gsap: {
    label: "GSAP",
    direct: [
      "https://cdn.simpleicons.org/greensock/88CE02",
      "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/greensock.svg",
      "https://api.iconify.design/simple-icons:greensock.svg?color=%2388CE02",
    ],
  },
  greensock: {
    label: "GSAP",
    direct: [
      "https://cdn.simpleicons.org/greensock/88CE02",
      "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/greensock.svg",
    ],
  },
  "iron-session": { label: "iron-session", direct: [si("auth0")] },
  resend: { slug: "resend", label: "Resend", direct: [si("resend")] },
  html5: { slug: "html5", label: "HTML5", direct: [devicon("html5"), si("html5")] },
  css3: { slug: "css3", label: "CSS3", direct: [devicon("css3"), si("css3")] },
  javascript: { slug: "javascript", label: "JavaScript", direct: [devicon("javascript"), si("javascript")] },
  "google fonts": { slug: "googlefonts", label: "Google Fonts", direct: [devicon("google"), si("googlefonts")] },
  "material symbols": { label: "Material Symbols", direct: [devicon("google"), si("google")] },
  "static hosting": { label: "Static hosting", direct: [si("githubpages"), devicon("github")] },
  "tanstack start": { slug: "react", label: "TanStack Start", direct: [devicon("react"), si("react")] },
  "tanstack server functions": { slug: "react", label: "TanStack Server Functions", direct: [devicon("react")] },
  nodemailer: { label: "Nodemailer", direct: [devicon("nodejs")] },
  "embla carousel": {
    label: "Embla Carousel",
    direct: [emblaLogo, "https://www.embla-carousel.com/embla-logo.svg"],
  },
  "google places api": { label: "Google Places API", direct: [devicon("google"), si("googlemaps")] },
  lucide: {
    label: "Lucide",
    direct: [lucideLogo, "https://cdn.simpleicons.org/lucide/F56565", "https://api.iconify.design/simple-icons:lucide.svg?color=%23F56565"],
  },
  "radix ui": {
    label: "Radix UI",
    direct: [radixUiLogo, "https://cdn.simpleicons.org/radixui/FFFFFF", "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/radixui.svg"],
  },
  lenis: {
    label: "Lenis",
    direct: [lenisLogo],
  },
  "custom css": { label: "Custom CSS", direct: [devicon("css3"), si("css3")] },
  "figma tokens": { label: "Figma tokens", direct: [si("figma")] },
  "sticky card stack": { label: "Sticky card stack", direct: [devicon("javascript")] },
  "kpi animation": { label: "KPI animation", direct: [devicon("javascript")] },
  "video modal": { label: "Video modal", direct: [devicon("javascript")] },
  "contact api": { label: "Contact API", direct: [devicon("nodejs")] },
  formspree: { label: "Formspree", direct: [si("formspree")] },
  "react hook form": {
    label: "React Hook Form",
    direct: ["https://cdn.simpleicons.org/reacthookform/EC5990", "https://api.iconify.design/simple-icons:reacthookform.svg?color=%23EC5990"],
  },
  "vanilla js": { label: "Vanilla JS", direct: [devicon("javascript"), si("javascript")] },
  whatsapp: { slug: "whatsapp", label: "WhatsApp", direct: [si("whatsapp"), devicon("whatsapp")] },
  "remove.bg": { label: "Remove.bg", direct: DIRECT["remove.bg"] },
  mailtrap: { slug: "mailtrap", label: "Mailtrap", direct: [si("mailtrap")] },
  cloudinary: { slug: "cloudinary", label: "Cloudinary", direct: [si("cloudinary")] },
  jwt: { slug: "jsonwebtokens", label: "JWT", direct: [si("jsonwebtokens")] },
  nextauth: { label: "NextAuth", direct: [si("nextdotjs")] },
  "google oauth": { label: "Google OAuth", direct: [devicon("google"), si("google")] },
  paypal: { slug: "paypal", label: "PayPal", direct: [devicon("paypal"), si("paypal")] },
  twint: { label: "Twint", direct: [si("stripe"), DIRECT.stripe[0]!] },
  "socket.io": { label: "Socket.io", direct: [devicon("socketio"), si("socketdotio")] },
  socketio: { label: "Socket.io", direct: [devicon("socketio"), si("socketdotio")] },
  zustand: { label: "Zustand", direct: [si("react")] },
  "react-i18next": { label: "react-i18next", direct: [si("react")] },
  "upstash redis": { slug: "upstash", label: "Upstash Redis", direct: [si("upstash")] },
  "qr codes": { label: "QR codes", direct: [si("qrcode")] },
  "firebase admin": { slug: "firebase", label: "Firebase Admin", direct: [devicon("firebase"), si("firebase")] },
  "firebase auth": { slug: "firebase", label: "Firebase Auth", direct: [devicon("firebase"), si("firebase")] },
  "service worker": { label: "Service Worker", direct: [devicon("google"), si("googlechrome")] },
  "fr / en / de": { label: "FR / EN / DE", direct: [si("googletranslate")] },
  mailtrap: { slug: "mailtrap", label: "Mailtrap", direct: [si("mailtrap")] },
  resend: { slug: "resend", label: "Resend", direct: [si("resend")] },
  "quickchart qr": { label: "QuickChart QR", direct: [si("qrcode")] },
  "tanstack server functions": { slug: "react", label: "TanStack Server Functions", direct: [devicon("react")] },
  "cloudflare workers": { slug: "cloudflare", label: "Cloudflare Workers", direct: [devicon("cloudflare"), si("cloudflareworkers")] },
  bcryptjs: { label: "bcryptjs", direct: [devicon("nodejs")] },
  motion: { slug: "framer", label: "Motion", direct: [devicon("framermotion"), si("framer")] },
  nestjs: { slug: "nestjs", label: "NestJS", direct: [devicon("nestjs"), si("nestjs")] },
  "nest.js": { slug: "nestjs", label: "Nest.js", direct: [devicon("nestjs"), si("nestjs")] },
  "redux toolkit": { slug: "redux", label: "Redux Toolkit", direct: [devicon("redux"), si("redux")] },
  "redux saga": { slug: "redux", label: "Redux Saga", direct: [devicon("redux"), si("redux")] },
  "redux thunk": { slug: "redux", label: "Redux Thunk", direct: [devicon("redux"), si("redux")] },
  "chart.js": { slug: "chartdotjs", label: "Chart.js", direct: [si("chartdotjs")] },
  "rest apis": {
    label: "REST APIs",
    direct: [
      "https://cdn.simpleicons.org/openapiinitiative/6BA539",
      "https://api.iconify.design/mdi:api.svg?color=%236BA539",
      devicon("nodejs"),
    ],
  },
  websockets: {
    label: "WebSockets",
    direct: [
      "https://cdn.simpleicons.org/socketdotio/010101",
      "https://api.iconify.design/simple-icons:socketdotio.svg?color=%23010101",
      "https://api.iconify.design/mdi:transit-connection-variant.svg?color=%2338BDF8",
      devicon("socketio"),
    ],
  },
  lambda: {
    slug: "awslambda",
    label: "AWS Lambda",
    direct: [
      "https://cdn.simpleicons.org/awslambda/FF9900",
      "https://api.iconify.design/simple-icons:awslambda.svg?color=%23FF9900",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
    ],
  },
  "aws amplify": {
    slug: "awsamplify",
    label: "AWS Amplify",
    direct: [
      "https://cdn.simpleicons.org/awsamplify/FF9900",
      "https://api.iconify.design/simple-icons:awsamplify.svg?color=%23FF9900",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
    ],
  },
  amplify: {
    slug: "awsamplify",
    label: "AWS Amplify",
    direct: [
      "https://cdn.simpleicons.org/awsamplify/FF9900",
      "https://api.iconify.design/simple-icons:awsamplify.svg?color=%23FF9900",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
    ],
  },
  "api gateway": {
    slug: "amazonapigateway",
    label: "API Gateway",
    direct: [
      "https://cdn.simpleicons.org/amazonapigateway/FF4F8B",
      "https://api.iconify.design/simple-icons:amazonapigateway.svg?color=%23FF4F8B",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
      "https://api.iconify.design/mdi:api.svg?color=%23FF9900",
    ],
  },
  rds: {
    label: "AWS RDS",
    direct: [
      "https://cdn.simpleicons.org/amazonrds/527FFF",
      "https://api.iconify.design/simple-icons:amazonrds.svg?color=%23527FFF",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
      "https://cdn.simpleicons.org/mysql/4479A1",
      "https://api.iconify.design/mdi:database.svg?color=%23527FFF",
    ],
  },
  "ci/cd": {
    slug: "githubactions",
    label: "CI/CD",
    direct: [
      "https://cdn.simpleicons.org/githubactions/2088FF",
      "https://api.iconify.design/simple-icons:githubactions.svg?color=%232088FF",
      "https://cdn.simpleicons.org/gitlab/FC6D26",
    ],
  },
  graphql: {
    slug: "graphql",
    label: "GraphQL",
    direct: [devicon("graphql"), "https://cdn.simpleicons.org/graphql/E10098", si("graphql")],
  },
  fastapi: {
    slug: "fastapi",
    label: "FastAPI",
    direct: ["https://cdn.simpleicons.org/fastapi/009688", si("fastapi"), devicon("python")],
  },
  express: {
    slug: "express",
    label: "Express",
    direct: [
      "https://cdn.simpleicons.org/express/000000",
      "https://api.iconify.design/simple-icons:express.svg?color=%23000000",
      "https://api.iconify.design/logos:express.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
    ],
  },
  s3: {
    slug: "amazons3",
    label: "S3",
    direct: [
      "https://cdn.simpleicons.org/amazons3/569A31",
      "https://cdn.simpleicons.org/amazonaws/FF9900",
    ],
  },
  openai: {
    slug: "openai",
    label: "OpenAI",
    direct: [
      "https://cdn.simpleicons.org/openai/412991",
      "https://api.iconify.design/simple-icons:openai.svg?color=%23412991",
      "https://cdn.simpleicons.org/openai/111111",
    ],
  },
  claude: {
    slug: "anthropic",
    label: "Claude",
    direct: [
      "https://cdn.simpleicons.org/claude/D97757",
      "https://cdn.simpleicons.org/anthropic/D4A27F",
      "https://api.iconify.design/simple-icons:anthropic.svg?color=%23D4A27F",
    ],
  },
  anthropic: {
    slug: "anthropic",
    label: "Claude",
    direct: [
      "https://cdn.simpleicons.org/anthropic/D4A27F",
      "https://cdn.simpleicons.org/claude/D97757",
    ],
  },
  cursor: {
    label: "Cursor",
    direct: [
      "https://cdn.simpleicons.org/cursor/111111",
      "https://api.iconify.design/simple-icons:cursor.svg?color=%23111111",
      "https://avatars.githubusercontent.com/u/139895814?s=64&v=4",
    ],
  },
  github: {
    slug: "github",
    label: "GitHub",
    direct: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
      "https://cdn.simpleicons.org/github/181717",
      "https://api.iconify.design/logos:github-icon.svg",
      "https://api.iconify.design/simple-icons:github.svg?color=%23181717",
    ],
  },
  "github copilot": {
    slug: "githubcopilot",
    label: "GitHub Copilot",
    direct: [
      "https://cdn.simpleicons.org/githubcopilot/000000",
      "https://api.iconify.design/simple-icons:githubcopilot.svg?color=%23000000",
      "https://cdn.simpleicons.org/github/181717",
    ],
  },
  chatgpt: {
    slug: "openai",
    label: "ChatGPT",
    direct: [
      "https://cdn.simpleicons.org/openai/10A37F",
      "https://cdn.simpleicons.org/chatgpt/74AA9C",
      "https://api.iconify.design/simple-icons:openai.svg?color=%2310A37F",
    ],
  },
  figma: {
    slug: "figma",
    label: "Figma",
    direct: [devicon("figma"), "https://cdn.simpleicons.org/figma/F24E1E", si("figma")],
  },
  postman: {
    slug: "postman",
    label: "Postman",
    direct: [devicon("postman"), "https://cdn.simpleicons.org/postman/FF6C37", si("postman")],
  },
  linear: {
    slug: "linear",
    label: "Linear",
    direct: [
      "https://cdn.simpleicons.org/linear/5E6AD2",
      "https://api.iconify.design/simple-icons:linear.svg?color=%235E6AD2",
    ],
  },
  lovable: {
    slug: "lovable",
    label: "Lovable",
    direct: [
      "https://cdn.simpleicons.org/lovable/FF6B6B",
      "https://api.iconify.design/simple-icons:lovable.svg?color=%23FF6B6B",
      "https://api.iconify.design/mdi:heart-flash.svg?color=%23FF6B6B",
    ],
  },
  "rag pipelines": {
    label: "RAG",
    direct: [
      "https://api.iconify.design/mdi:vector-polyline.svg?color=%2338BDF8",
      "https://api.iconify.design/mdi:graph-outline.svg?color=%238B5CF6",
      "https://cdn.simpleicons.org/openai/412991",
    ],
  },
  "prompt engineering": {
    label: "Prompt engineering",
    direct: [
      "https://api.iconify.design/mdi:text-box-edit-outline.svg?color=%23F59E0B",
      "https://cdn.simpleicons.org/openai/412991",
    ],
  },
  "tool calling": {
    label: "Tool calling",
    direct: [
      "https://api.iconify.design/mdi:tools.svg?color=%2306B6D4",
      "https://cdn.simpleicons.org/openai/412991",
    ],
  },
  "streaming apis": {
    label: "Streaming APIs",
    direct: [
      "https://api.iconify.design/mdi:broadcast.svg?color=%2322C55E",
      "https://cdn.simpleicons.org/nodedotjs/339933",
    ],
  },
  "github actions": {
    slug: "githubactions",
    label: "GitHub Actions",
    direct: [
      "https://cdn.simpleicons.org/githubactions/2088FF",
      "https://api.iconify.design/simple-icons:githubactions.svg?color=%232088FF",
    ],
  },
  webhooks: {
    label: "Webhooks",
    direct: [
      "https://cdn.simpleicons.org/webhook/000000",
      "https://api.iconify.design/mdi:webhook.svg?color=%23F97316",
      "https://cdn.simpleicons.org/nodedotjs/339933",
    ],
  },
  bluebot: { label: "BlueBot", direct: ["https://cdn.simpleicons.org/openai/412991"] },
  swagger: { slug: "swagger", label: "Swagger", direct: ["https://cdn.simpleicons.org/swagger/85EA2D", si("swagger")] },
  sentry: { slug: "sentry", label: "Sentry", direct: ["https://cdn.simpleicons.org/sentry/362D59", si("sentry")] },
  electron: { slug: "electron", label: "Electron", direct: [devicon("electron"), "https://cdn.simpleicons.org/electron/47848F"] },
  "courier apis": { label: "Courier APIs", direct: [novaPostLogo, fanCourierLogo] },
  "aws textract": {
    label: "AWS Textract",
    direct: [
      "https://cdn.simpleicons.org/amazonaws/FF9900",
      "https://api.iconify.design/mdi:text-recognition.svg?color=%23FF9900",
    ],
  },
  typeorm: { label: "TypeORM", direct: [devicon("typescript"), si("typeorm")] },
  weasis: { label: "Weasis", direct: ["https://api.iconify.design/mdi:hospital-box.svg?color=%23EF4444"] },
  dicom: { label: "DICOM", direct: ["https://api.iconify.design/mdi:file-image.svg?color=%236366F1"] },
  "azure blob": { slug: "microsoftazure", label: "Azure Blob", direct: [devicon("azure"), si("microsoftazure")] },
  "azure email": { slug: "microsoftazure", label: "Azure Email", direct: [devicon("azure"), si("microsoftazure")] },
  sse: { label: "SSE", direct: ["https://api.iconify.design/mdi:broadcast.svg?color=%23F59E0B"] },
  pm2: { label: "PM2", direct: ["https://cdn.simpleicons.org/pm2/2B037A"] },
};

function normalize(name: string) {
  return name.toLowerCase().replace(/[()]/g, "").trim();
}

function iconifyUrl(id: string) {
  return `https://api.iconify.design/${id}.svg`;
}

function buildUrls(entry: IconEntry): string[] {
  const urls: string[] = [];
  if (entry.direct) urls.push(...entry.direct);
  if (entry.iconify) urls.push(iconifyUrl(entry.iconify));
  if (entry.slug) {
    urls.push(techIconUrl(entry.slug, entry.color));
    urls.push(iconifyUrl(`simple-icons:${entry.slug}`));
  }
  return [...new Set(urls.filter(Boolean))];
}

export function resolveStackIcon(name: string) {
  const normalized = normalize(name);
  const alias = ALIASES[normalized];

  if (alias) {
    return { label: alias.label ?? name, iconUrls: buildUrls(alias), hasLogo: true };
  }

  // Prefer longer exact-ish keys so "git" does not steal "github"
  const fuzzy = Object.entries(ALIASES)
    .filter(([key]) => {
      if (key === normalized) return true;
      const token = normalized.split(" ")[0] ?? "";
      if (!token || token.length < 2) return false;
      // Only whole-token / prefix matches — never "github".includes("git")
      return (
        normalized.startsWith(`${key} `) ||
        key.startsWith(`${normalized} `) ||
        (key.startsWith(token) && key.length - token.length <= 2 && token.length >= 4)
      );
    })
    .sort((a, b) => b[0].length - a[0].length)[0];

  if (fuzzy) {
    return { label: fuzzy[1].label ?? name, iconUrls: buildUrls(fuzzy[1]), hasLogo: true };
  }

  const fromStack = techBySlug(name.split(/[\s(+]/)[0] ?? name);
  if (fromStack?.slug) {
    return {
      label: fromStack.name,
      iconUrls: [techIconUrl(fromStack.slug, fromStack.color), iconifyUrl(`simple-icons:${fromStack.slug}`)].filter(
        Boolean,
      ),
      hasLogo: true,
    };
  }

  const guess = normalized.replace(/\s+/g, "").replace(/\./g, "dot");
  return {
    label: name,
    iconUrls: [iconifyUrl(`logos:${guess}`), iconifyUrl(`simple-icons:${guess}`)],
    hasLogo: true,
  };
}

export function stackIconInitials(label: string) {
  return label
    .split(/[\s.]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}
