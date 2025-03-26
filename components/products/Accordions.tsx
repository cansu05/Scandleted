import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordions = () => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Ingredients</AccordionTrigger>
          <AccordionContent>
            100% soy wax, essential oils, cotton wick, natural fragrance blends
            — free from toxins, paraffin, and synthetic dyes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How to use?</AccordionTrigger>
          <AccordionContent>
            Light the candle in a quiet space. Allow the wax to melt to the
            edges during the first burn for an even glow. Trim the wick before
            each use to ensure a clean flame.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How to feel?</AccordionTrigger>
          <AccordionContent>
            You are like being under a pine tree at the foot of the hill. The
            smell of earth mixed with rain will cool you.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default Accordions;
