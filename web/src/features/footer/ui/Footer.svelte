<script lang="ts">
  import { FOOTER_LINKS } from '@features/footer/config/footerConfig'
  import { ROUTES } from '@shared/routes'

  import dayjs from 'dayjs'
  const year = dayjs().year()

  type FooterLink = { name: string; href: string }
  const footerEntries = Object.entries(FOOTER_LINKS) as [string, FooterLink[]][]
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
      {#each footerEntries as [category, links], index (index)}
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
  }

  .footer-inner {
    max-width: $container-max;
    place-self: center;
    padding: 48px 16px;
  }

  .footer-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

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
    gap: 8px;
    text-decoration: none;
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
  }

  .footer-link-heading {
    font-size: map.get($font-size, sm);
    font-weight: map.get($font-weight, semibold);
    color: map.get($text, primary);
  }

  .footer-link-list {
    display: flex;
    gap: 12px;
    padding: 0;
    list-style: none;
    flex-direction: column;
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
    display: flex;
    gap: 8px;
    padding-top: 32px;
    border-top: 1px solid map.get($border, default);
    flex-direction: column;

    @media (min-width: #{map.get($breakpoint, sm)}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .footer-copyright {
    font-size: map.get($font-size, sm);
    color: map.get($text, muted);
  }

  .footer-tagline {
    font-size: map.get($font-size, xs);
    color: map.get($text, muted);
  }
</style>
