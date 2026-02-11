import data from '@/../product/sections/analytics-insights/data.json'
import { ReceiptList } from './components/ReceiptList'

export default function ReceiptListView() {
  return (
    <ReceiptList
      receipts={data.receipts}
      onView={(id) => console.log('View receipt:', id)}
      onVerify={(id) => console.log('Verify receipt:', id)}
      onReject={(id) => console.log('Reject receipt:', id)}
      onSearch={(query) => console.log('Search:', query)}
      onFilter={(filters) => console.log('Filter:', filters)}
    />
  )
}
