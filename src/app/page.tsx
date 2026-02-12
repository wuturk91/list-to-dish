import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container-main">
      <main className={styles.landingJumbo}>
        <span className={styles.landingAnimation}>🥘</span>
        <h1>Turn Your Ingredients Into Delicious Recipes</h1>
        <h2>Just list your ingredients and get AI generated personalised recipes in seconds.</h2>

        <div className={styles.ctaContainer}>
          <Link href="/generate" className={styles.ctaButton}>Try It Now</Link>
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
