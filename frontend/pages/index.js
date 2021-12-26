import Link from "next/link";
import NavBar from "../components/NavBar";
import { useRouter, withRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  return (
    <div className="contaier">
      <NavBar data={data} />
    </div>
  );
}
