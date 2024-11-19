import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <div className="flex justify-center items-center py-20">
        <Link href="/dashboard">
          <Button size="lg" className="text-lg">Get Started <ArrowRight className="ml-2 h-5 w-5"/> </Button>
        </Link>
      </div>
    </div>
  );
}
