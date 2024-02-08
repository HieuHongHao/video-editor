import { FrameEditorContext } from "@/components/frame-editor/FrameEditor";
import { useContext } from "react";

export default function useAnimate(){
    const {animatingText, setAnimatingText} = useContext(FrameEditorContext);
    return {animatingText, setAnimatingText}
}