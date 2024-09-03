"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO na Empresa",
    content:
      "Este serviço foi um divisor de águas para o nosso negócio. A equipe é incrivelmente profissional e o produto superou nossas expectativas.",
    avatar: "/clients/01.jpg",
  },
  {
    name: "Jane Smith",
    role: "Diretora de Marketing",
    content:
      "Simplesmente adoro os resultados! Nossas métricas melhoraram drasticamente desde que começamos a usar isso. Altamente recomendado para quem deseja impulsionar seu negócio.",
    avatar: "/clients/02.jpg",
  },
  {
    name: "Alice Johnson",
    role: "Gerente de Produto",
    content:
      "A expertise e a atenção aos detalhes da equipe são incomparáveis. Eles realmente se importam com o sucesso de seus clientes, e isso se reflete no trabalho.",
    avatar: "/clients/03.jpg",
  },
  {
    name: "Bob Brown",
    role: "CTO na TechCorp",
    content:
      "Uma experiência de primeira classe do início ao fim. A qualidade do trabalho e o atendimento ao cliente são excepcionais.",
    avatar: "/clients/04.jpg",
  },
  {
    name: "Bob Brown",
    role: "CTO na TechCorp",
    content:
      "Uma experiência de primeira classe do início ao fim. A qualidade do trabalho e o atendimento ao cliente são excepcionais.",
    avatar: "/clients/05.jpg",
  },
];

export function CarouselTestimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="-ml-1">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <CardContent className="flex flex-col items-center p-6">
                  <Image
                    width={64}
                    height={64}
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="w-16 h-16 rounded-full mb-4"
                  />
                  <p className="text-center text-lg italic text-gray-600 dark:text-gray-300">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-4 text-center">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </span>
                    <br />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
