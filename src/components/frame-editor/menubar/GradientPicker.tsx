"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paintbrush } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarSub,
} from "@/components/ui/menubar";
import useFrameEditor from "@/hooks/useFrameEditor";
import { cloneDeep } from "lodash";



export function GradientPicker({
  className,
}: {
  className?: string;
}) {
  const {frames, setFrames, currentFrame} = useFrameEditor();
  const background = useMemo(() => {
    return frames[currentFrame].backgroundColor;
  }, [frames, currentFrame])
  
  const solids = [
    "#FFFFFF",
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
  ];

  const gradients = [
    "linear-gradient(to top left,#accbee,#e7f0fd)",
    "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
    "linear-gradient(to top left,#000000,#434343)",
    "linear-gradient(to top left,#09203f,#537895)",
    "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
    "linear-gradient(to top left,#f953c6,#b91d73)",
    "linear-gradient(to top left,#ee0979,#ff6a00)",
    "linear-gradient(to top left,#F00000,#DC281E)",
    "linear-gradient(to top left,#00c6ff,#0072ff)",
    "linear-gradient(to top left,#4facfe,#00f2fe)",
    "linear-gradient(to top left,#0ba360,#3cba92)",
    "linear-gradient(to top left,#FDFC47,#24FE41)",
    "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
    "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
    "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
  ];

  const images = [
    "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
    "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
    "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  ];

  const defaultTab = useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <MenubarSub>
      <MenubarSubTrigger>
        <div className="flex items-center gap-2 max-w-48">
          {background ? (
            <div
              className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
              style={{ background }}
            ></div>
          ) : (
            <Paintbrush className="h-4 w-4" />
          )}
          <div className="truncate flex-1">
            {background ? background : "Pick a color"}
          </div>
        </div>
      </MenubarSubTrigger>
      <MenubarSubContent>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="image">
              Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0 w-[220px] ">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => {
                  setFrames(prev => {
                    prev[currentFrame].backgroundColor = s;
                    return cloneDeep(prev);
                  })
                }}
              />
            ))}
          </TabsContent>

          <TabsContent
            value="gradient"
            className="flex flex-wrap gap-1 mt-0 w-[220px]"
          >
            {gradients.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => {
                  setFrames(prev => {
                    prev[currentFrame].backgroundColor = s;
                    return cloneDeep(prev);
                  })
                }}
              />
            ))}
          </TabsContent>

          <TabsContent value="image" className="mt-0">
            <div className="grid grid-cols-2 gap-1 mb-2">
              {images.map((s) => (
                <div
                  key={s}
                  style={{ backgroundImage: s }}
                  className="rounded-md bg-cover bg-center h-12 w-full cursor-pointer active:scale-105"
                  onClick={() => {
                    setFrames(prev => {
                      prev[currentFrame].backgroundColor = s;
                      return cloneDeep(prev);
                    })
                  }}
                />
              ))}
            </div>

            <GradientButton background={background}>
              🎁 Get abstract{" "}
              <Link
                href="https://gradient.page/wallpapers"
                className="hover:underline font-bold"
                target="_blank"
              >
                wallpapers
              </Link>
            </GradientButton>
          </TabsContent>

          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </MenubarSubContent>
    </MenubarSub>
  );
}

const GradientButton = ({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
        {children}
      </div>
    </div>
  );
};
