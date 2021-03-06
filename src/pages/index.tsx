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
    title: 'Javascript',
    logoUrl: 'img/techs-logo.svg#javascript',
  },
  {
    title: 'Vue.js',
    logoUrl: 'img/techs-logo.svg#vue',
  },
  {
    title: 'Nuxt.js',
    logoUrl: 'img/techs-logo.svg#nuxt'
  },
  {
    title: 'React.js',
    logoUrl: 'img/techs-logo.svg#react'
  },
  {
    title: 'Next.js',
    logoUrl: 'img/techs-logo.svg#next'
  },
  {
    title: 'Flutter',
    logoUrl: 'img/techs-logo.svg#flutter'
  },
  {
    title: 'Docker',
    logoUrl: 'img/techs-logo.svg#docker'
  },
]

function TechItem({ title, logoUrl }: Tech): JSX.Element {
  return (
    <div className={clsx('col col--2', styles.tech)}>
      <div className="text--center">
        <svg width="64" height="64">
          <use xlinkHref={useBaseUrl(logoUrl)}></use>
        </svg>
        <h3>{title}</h3>
      </div>
    </div>
  )
}

function TechStackSection(): JSX.Element {
  return (
    <section className={styles.techStack}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Technology Stack</h2>
        <div className="row">
          {techs.map((props, idx) => (
            <TechItem key={idx} {...props} />
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
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>{techs && techs.length > 0 && <TechStackSection />}</main>
    </Layout>
  )
}

export default Home
