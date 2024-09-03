"use client";

import React from "react";
import { AreaGraph } from "@/components/graphs/AreaGraph";
import { BarGraph } from "@/components/graphs/BarGraph";
import PageContainer from "@/components/layout/PageContainer";
import { PieGraph } from "@/components/graphs/PieGraph";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
import content from "@/app/content.json"; // Importando o JSON

export default function Page() {
  const pageContent = content.page;

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {pageContent.welcomeText}
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button>{pageContent.downloadButtonText}</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              {pageContent.tabs.overview}
            </TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              {pageContent.tabs.analytics}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {pageContent.cards.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d={card.icon} />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {card.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4"><BarGraph /></div>
              <Card className="col-span-4 md:col-span-3 bg-blue-50 border border-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <CardHeader className="flex items-center justify-center">
                    <Info className="h-6 w-6 text-blue-600 mr-2" />
                    <CardTitle>{pageContent.importantInfo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {pageContent.importantInfo.description}
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
              <div className="col-span-4"><AreaGraph /></div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
