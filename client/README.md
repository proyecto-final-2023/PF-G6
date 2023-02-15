## TS stuff

### Use a key that was modified before to acces an object

```ts
export type RouteMapping = {
  imc: string;
  dietsplanning: string;
  register: string;
};

const optionsUrlMapping: RouteMapping = {
  imc: "/guest/imc-calculator",
  dietsplanning: "/guest/diet-planning",
  register: "/login/register",
};

const option = "imc ".trim();
const url = optionsUrlMapping[option as keyof RouteMapping];
```

## forms

[hoosk lib](https://legacy.react-hook-form.com/get-started)
