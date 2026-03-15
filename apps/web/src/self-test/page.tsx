import { Button } from "@workspace/ui/components/button";
import { SelfTestTitle } from "./title";
import { SelfTestForm } from "./form/form";

export function SelfTestPage() {
    return (
        <section>
            <SelfTestTitle />
            <SelfTestForm />
        </section>
    )
}
