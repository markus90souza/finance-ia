import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    return redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-2 bg-black">
      <div className="flex h-full flex-col items-center justify-center px-8">
        <div className="max-w-md">
          <Image src={"/logo.svg"} alt="logo" width={173} height={39} />
          <div className="mt-8 flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-white">Bem vindo</h1>
            <p className="text-muted-foreground">
              A Finance AI é uma plataforma de gestão financeira que utiliza IA
              para monitorar suas movimentações, e oferecer insights
              personalizados, facilitando o controle do seu orçamento.
            </p>

            <SignInButton>
              <Button variant={"outline"} className="mt-8">
                <Image
                  src={"/google-icon.svg"}
                  alt="google"
                  width={20}
                  height={20}
                />
                Entrar com Google
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          alt=""
          src={"/login.png"}
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
};

export default LoginPage;
