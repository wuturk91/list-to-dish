import styles from './page.module.css'

export default function Home() {
  return (
    <div className="container-main">
      <main className="landing-jumbo">
        <span className="landing-icon">🥘</span>
        <h1>Turn Your Ingredients Into Delicious Recipes</h1>
        <h2>Just list your ingredients and get AI generated personalised recipes in seconds.</h2>

        <div className={styles.ctaContainer}>
          <a
            className={styles.ctaButton}
            href="/generate"
          >
              Try It Now
          </a>
        </div>
      </main>
      <div className={styles.features}>
        <div>
          <p>Generate Recipes</p>
        </div>
        <div>
          <p>Build Meal Plans</p>
        </div>
        <div>
          <p>Create Shopping Lists</p>
        </div>
      </div>
    </div>
  );
}
