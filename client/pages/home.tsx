import ssrProtection from "@/utils/ssrProtection";

export default function home() {
  return (
    <div>
      <h1>BEANS</h1>
    </div>
  );
}

//  ? Server side func, for better performance
export async function getServerSideProps() {
  return await ssrProtection();
}
