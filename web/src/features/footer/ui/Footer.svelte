<script lang="ts">
  import { FOOTER_LINKS } from '../config/footerConfig'
  import { ROUTES } from '../../../shared/routes'

  const footerLinks = FOOTER_LINKS
  const year = new Date().getFullYear()
</script>

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <!-- ブランド -->
      <div class="footer-brand">
        <a href={ROUTES.home} class="footer-brand-link">
          <span class="footer-brand-name">推しアゲ</span>
        </a>
        <p class="footer-brand-desc">
          散らばった競技情報を、ひとつに。<br />
          あなたの応援を、選手に届く力へ。
        </p>
      </div>

      <!-- リンク -->
      {#each Object.entries(footerLinks) as [category, links], index (index)}
        <div>
          <h3 class="footer-link-heading">{category}</h3>
          <ul class="footer-link-list">
            {#each links as link, linkIndex (linkIndex)}
              <li>
                <a href={link.href} class="footer-link">{link.name}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <div class="footer-bottom">
      <p class="footer-copyright">&copy; {year} 推しアゲ. All rights reserved.</p>
      <p class="footer-tagline">
        マイナーをメジャーに。すべての「推し」が、競技だけで食べていける世界を創る。
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  @use 'sass:map';
  @use 'index' as *;

  .site-footer {
    background: map.get($bg, surface);
    border-top: 1px solid map.get($border, default);
    margin-top: auto;
  }

  .footer-inner {
    max-width: $container-max;
    margin: 0 auto;
    padding: 3rem 1rem;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-template-columns: 1.5fr repeat(3, 1fr);
    }
  }

  .footer-brand {
    grid-column: 1 / -1;

    @media (min-width: #{map.get($breakpoint, md)}) {
      grid-column: 1;
    }
  }

  .footer-brand-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    margin-bottom: 0.75rem;
  }

  .footer-brand-name {
    font-size: map.get($font-size, xl);
    font-weight: map.get($font-weight, bold);
    color: map.get($text, primary);
    background: linear-gradient(135deg, #{map.get($brand, 500)}, #{map.get($indigo, 500)});
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .footer-brand-desc {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    line-height: map.get($line-height, relaxed);
    margin: 0;
  }

  .footer-link-heading {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
    margin: 0 0 1rem;
  }

  .footer-link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-link {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    text-decoration: none;
    transition: color map.get($transition, fast);

    &:hover {
      color: map.get($brand, 500);
    }
  }

  .footer-bottom {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid map.get($border, default);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .footer-copyright {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
    margin: 0;
  }

  .footer-tagline {
    font-size: map.get($font-size, xs);
    color: map.get($text, muted);
    margin: 0;
  }
</style>
