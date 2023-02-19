## Comp separation stuff

```jsx
libs (react, react-icons, suztand, etc...)...

ts-types...

components...
// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
rfc
```

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

## i18 attempt

```tsx
import CarouselComp from "@/components/carousel/CarouselComp";
import ssrProtection from "@/utils/ssrProtection";
import homeSlides from "@/assets/home-slides";
import { useRouter } from "next/router";

type Test = {
  "en-EN": {
    title: string;
  };
  "es-ES": { title: string };
};

const myTest: Test = {
  "en-EN": {
    title: "JHON",
  },
  "es-ES": {
    title: "JUAN",
  },
};

export default function Home() {
  const { locale, locales, defaultLocale, asPath } = useRouter();
  const { title } = myTest[locale as keyof Test];

  console.log(locale);

  // const localeDef = router.locale;
  // const { title } = myTest[locale] || "";
  console.log();

  return <h1>bruv: {title}</h1>;
}

//  ? Server side func, for better performance
export async function getServerSideProps() {
  return await ssrProtection();
}
```
