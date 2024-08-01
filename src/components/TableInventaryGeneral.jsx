import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'keep-react'

function TableInventaryGeneral() {
  return (
    <Table>
      <TableCaption>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h2 className="text-heading-6 font-semibold text-metal-900 dark:text-white">Movientos</h2>
            <Badge color="secondary" className="dark:bg-metal-800 dark:text-white">
              Ultimos 10 movimientos
            </Badge>
            <Badge color="warning">Omma & Arthrex</Badge>
          </div>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="w-[320px]">Product Name</div>
          </TableHead>
          <TableHead>
            <div className="w-[65px]">Price</div>
          </TableHead>
          <TableHead>
            <div className="w-[100px]">Category</div>
          </TableHead>
          <TableHead>
            <div className="w-[60px]">Rating</div>
          </TableHead>
          <TableHead>
            <div className="w-[60px]">Stock</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {[...Array(10)].map((item, index) => (
          <TableRow key={index}>
            <TableCell>Valor</TableCell>
            <TableCell>2343</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>54</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableInventaryGeneral