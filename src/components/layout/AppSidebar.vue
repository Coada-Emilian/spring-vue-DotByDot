<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <a href="/">
        <img src="/logo.png" alt="DotByDot" />
      </a>
    </div>

    <nav class="sidebar-navigation">
      <a href="#">Today</a>
      <a href="#">Calendar</a>
      <a href="#">Habits</a>
      <a href="#">Stats</a>
      <a href="#">Notes</a>
      <a href="#">Settings</a>
    </nav>

    <div class="sidebar-promo">
      <img src="/sidebarlogo2.png" alt="" />

      <div class="sidebar-promo-text">
        <p>Not today?</p>
        <p>Tomorrow.</p>
        <span>♡</span>
      </div>
    </div>

    <div class="sidebar-user">
      <img src="/sidebarlogo1.png" alt="" />

      <div class="sidebar-user-text">
        <p>Emil</p>
        <span>One day at a time.</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 240px;
  height: 100vh;

  padding: 1.5rem 1rem;

  background: var(--color-navy);
  color: white;
}

.sidebar-logo {
  margin-bottom: 2.5rem;
  text-align: center;
}

.sidebar-logo img {
  display: block;
  width: 190px;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.sidebar-navigation {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sidebar-navigation a {
  padding: 0.75rem 1rem;

  border-radius: var(--radius-sm);

  color: #e2e8f0;
  text-decoration: none;
  font-size: 0.95rem;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.sidebar-navigation a:hover {
  background: var(--color-navy-light);
  color: white;
}

.sidebar-promo {
  margin-top: auto;
  padding-top: 2rem;

  text-align: center;
}

.sidebar-promo img {
  display: block;

  width: 100%;
  height: auto;
}

.sidebar-promo-text {
  margin-top: 0.75rem;
}

.sidebar-promo-text p {
  margin: 0;

  color: #e2e8f0;

  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 1.5;
}

.sidebar-promo-text span {
  display: block;

  margin-top: 0.4rem;

  color: #cbd5e1;
  font-size: 1.5rem;
}

.sidebar-user {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  margin-top: 1.25rem;
}

.sidebar-user img {
  display: block;

  width: 52px;
  height: 52px;

  flex-shrink: 0;
}

.sidebar-user-text p {
  margin: 0;

  color: white;

  font-family: Georgia, serif;
  font-size: 1rem;
}

.sidebar-user-text span {
  display: block;

  margin-top: 0.15rem;

  color: #cbd5e1;
  font-size: 0.8rem;
}

@media (max-width: 700px) {
  .sidebar {
    position: relative;

    width: 100%;
    height: auto;

    padding: 1rem;

    flex-direction: column;
  }

  .sidebar-logo {
    margin-bottom: 1rem;
  }

  .sidebar-logo img {
    width: 150px;
  }

  .sidebar-navigation {
    flex-direction: row;
    gap: 0.25rem;

    overflow-x: auto;
  }

  .sidebar-navigation a {
    flex-shrink: 0;
    padding: 0.6rem 0.75rem;
  }

  .sidebar-promo,
  .sidebar-user {
    display: none;
  }
}
</style>
