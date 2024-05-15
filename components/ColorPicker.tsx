import { useVisibleController } from "@/hooks/component/use-visible-controller";
import { useClickAway, useMemoizedFn } from "ahooks";
import React, { useRef, useState } from "react";
import {
  ColorResult,
  SketchPicker as RCSketchPicker,
  SketchPickerProps,
} from "react-color";

export interface ColorPickerSketchProps extends SketchPickerProps {
  targetClassName?: string;
  className?: string;
  targetWidth?: number;
  targetHeight?: number;
}

export const SketchPicker: React.FC<ColorPickerSketchProps> = ({
  targetClassName,
  className,
  targetWidth = 30,
  targetHeight = 30,
  ...sketchPickerProps
}) => {
  const [color, setColor] = useState(sketchPickerProps.color);

  const onChangeComplete = useMemoizedFn((color: ColorResult) => {
    setColor(color.hex);
  });

  const { visible, show, hide } = useVisibleController();

  const targetRef = useRef<HTMLDivElement>(null);

  const ref = useRef<HTMLDivElement>(null);
  useClickAway((e) => {
    if (e.target !== targetRef.current) hide();
  }, ref);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={targetRef}
        onClick={show}
        className={`cursor-pointer ${targetClassName}`}
        style={{
          backgroundColor: color as string,
          height: targetHeight + "px",
          width: targetWidth + "px",
        }}
      ></div>
      <div ref={ref} className={`absolute ${visible ? "" : "hidden"}`}>
        <RCSketchPicker
          color={color}
          onChangeComplete={onChangeComplete}
          {...sketchPickerProps}
        />
      </div>
    </div>
  );
};

const ColorPicker = {
  SketchPicker,
};

export default ColorPicker;
