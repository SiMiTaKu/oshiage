/**
 * アコーディオン名を一意に採番する。
 *
 * @param id - アコーディオンを識別する ID。
 * @returns details 要素の name 属性に使用する一意なアコーディオン名。
 */
export const createAccordionName = (id: string) => {
  return `accordion-${id}`
}
