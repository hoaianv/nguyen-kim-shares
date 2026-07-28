# Data Flow

## Standard read path

```text
App Router server page/layout
→ src/apis/* server action
→ api() in src/helpers/api.helper.ts
→ bearer cookie + external member API
→ IResponse / model interface
→ getValidData()
→ server-rendered props or src/init/*Initializer.tsx
→ Zustand store / client UI
```

The root layout’s menu, member, cart, advertising, support, and footer requests hydrate client state. The dynamic slug route passes resolved data directly to its selected feature component.

## Cart quote and checkout

```text
Product/cart interaction
→ useCartActions / useCartStore
→ cart add/update/delete API
→ selected IDs + coupon in useCartStore
→ debounced useQuoteActions → cart quote API
→ checkout page / OrderSummary → cart checkout API
→ order-confirmation route/UI
```

The exact post-checkout response mapping is backend-dependent and not fully verified.

## Event check-in

```text
Staff UI → useEventCheckin → participant API CRUD/import
→ response status/errorCode → toast + list refresh
Staff export → /api/export-participants → external participant API → XLSX download
Guest confirmation → UID check-in API → confirmation UI
```

No queue, cache, event bus, socket, or background job implementation was found. Next fetch tag use is only explicitly observed for the `me` request.
