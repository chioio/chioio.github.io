import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.scss'

const TITLE = 'Hi!'
const DESCRIPTION = "Tenn's page."

type Tech = {
  title: string
  logoUrl: string
}

const techs: Tech[] = [
  {
    title: 'JavaScript',
    logoUrl: 'img/techs-logo.svg#javascript',
  },
  {
    title: 'TypeScript',
    logoUrl: 'img/techs-logo.svg#typescript',
  },
  {
    title: 'Vue.js',
    logoUrl: 'img/techs-logo.svg#vue',
  },
  {
    title: 'Nuxt.js',
    logoUrl: 'img/techs-logo.svg#nuxt',
  },
  {
    title: 'React.js',
    logoUrl: 'img/techs-logo.svg#react',
  },
  {
    title: 'Next.js',
    logoUrl: 'img/techs-logo.svg#next',
  },
  {
    title: 'Node.js',
    logoUrl: 'img/techs-logo.svg#node',
  },
  {
    title: 'Deno',
    logoUrl: 'img/techs-logo.svg#deno',
  },
  {
    title: 'Flutter',
    logoUrl: 'img/techs-logo.svg#flutter',
  },
  {
    title: 'Docker',
    logoUrl: 'img/techs-logo.svg#docker',
  },
]

function TechItem({ title, logoUrl }: Tech): JSX.Element {
  return (
    <div className={styles.tech}>
      <div className="text--center">
        <svg className={styles.techImg}>
          <use xlinkHref={useBaseUrl(logoUrl)}></use>
        </svg>
        <div className={styles.techTitle}>{title}</div>
      </div>
    </div>
  )
}

function TechStackSection(): JSX.Element {
  return (
    <section className={styles.techStack}>
      <div className="container">
        <h1 className={styles.sectionTitle}>Technology Stack</h1>
        <div className={clsx('row', styles.techRow)}>
          {techs.map((props, id) => (
            <TechItem key={id} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <h2 className={styles.tagline}>{siteConfig.tagline}</h2>
          <div>
            <p className={styles.profile}>{siteConfig.customFields.profile}</p>
          </div>
        </div>
      </header>
      <main>{techs && techs.length > 0 && <TechStackSection />}</main>
    </Layout>
  )
}

export default Home
