import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { lusitana } from "@/components/fonts";


export default function Page() {
    return (
      <main>
         <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Transfer Tax Calculated" value="Tax Calculated">
          <CardHeader>
            <CardTitle>Transfer Tax Calculated</CardTitle>
            <CardDescription>Total Number of Calculation</CardDescription>
          </CardHeader>
        </Card>
        <Card title="Transfer Tax Calculated" value="Tax Calculated">
          <CardHeader>
            <CardTitle>Transfer Tax Calculated</CardTitle>
            <CardDescription>Total Number of Calculation</CardDescription>
          </CardHeader>
        </Card>
        <Card title="Transfer Tax Calculated" value="Tax Calculated">
          <CardHeader>
            <CardTitle>Transfer Tax Calculated</CardTitle>
            <CardDescription>Total Number of Calculation</CardDescription>
          </CardHeader>
        </Card>
        <Card title="Transfer Tax Calculated" value="Tax Calculated">
          <CardHeader>
            <CardTitle>Transfer Tax Calculated</CardTitle>
            <CardDescription>Total Number of Calculation</CardDescription>
          </CardHeader>
        </Card>
      </div>

      </main>
    )
  }