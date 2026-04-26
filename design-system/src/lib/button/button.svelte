<script lang="ts">
  export let label: string;
  export let tone: 'primary' | 'secondary' = 'primary';
</script>

<button class={`button ${tone}`} type="button">{label}</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 700;
    transition: transform 160ms ease;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-1px);
  }

  .primary {
    color: white;
    background: linear-gradient(135deg, #195ca7 0%, #3c8bd9 100%);
  }

  .secondary {
    color: #1f2b1e;
    background: #dce8d9;
  }
</style>
