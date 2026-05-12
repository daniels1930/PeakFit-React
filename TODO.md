# TODO - PayPage wizard UI

## Objetivo

Implementar `PayPage` como wizard de 2 formularios + navegación a `PaymentSuccess` (solo UI e interacción), con campos obligatorios y validación.

## Pasos

- [x] 1. Implementar `src/pages/PayPage/PayPage.tsx` con Step 1 (envío) y Step 2 (confirmación/resumen).
- [x] 2. Agregar estilos a `src/pages/PayPage/PayPage.css` (layout, inputs, botones, errores).
- [x] 3. Actualizar `src/pages/PaymentSuccess/PaymentSuccess.tsx` para mostrar confirmación (y opcionalmente resumen desde `location.state`).
- [ ] 4. (Opcional) Ajustar `PaymentSuccess.css` si requiere estética.
- [ ] 5. Probar en navegador: ir a `/pay`, validar campos, avanzar/retroceder, confirmar y llegar a `/payment-success`.
