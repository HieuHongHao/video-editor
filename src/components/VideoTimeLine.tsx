import { useMemo, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";



export default function VideoTimeLine() {
  return <TimeLine />;
}

function TimeLine() {
  const intervals = useMemo(() => {
    return [
      [0, 4],
      [4, 8],
      [8, 12],
      [12, 16],
      
    ];
  }, []);

  return (
    <div className="flex flex-row ml-10 mt-10">
      {intervals.map((interval) => {
        return <Node key={interval[0]} start={interval[0]} />;
      })}
      <div className="flex flex-col">
        <div className=" bg-white ring-1 rounded-full ring-zinc-200 h-2 w-2 -mt-0.5"></div>
        <div className="mt-2 font-medium text-sm">
          {intervals[intervals.length - 1][1]}
        </div>
      </div>
    </div>
  );
}

function Node({ start }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-[200px]">
        <div className=" bg-white ring-1 ring-zinc-200 h-2 w-2 -mt-0.5 rounded-full"></div>
        <div className="w-full h-1 bg-gray-100"></div>
      </div>
      <div className="mt-2 font-medium text-sm">{start}</div>
    </div>
  );
}
