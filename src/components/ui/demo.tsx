import Lanyard from "@/components/ui/Lanyard";

export default function DemoOne() {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Lanyard
        frontImage="/assets/vadiraj.jpg"
        backImage="/assets/card-back.svg"
      />
    </div>
  );
}

export { DemoOne };
