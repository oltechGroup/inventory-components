import Image from "../assets/react.svg";
import { Avatar, Badge, Button, Popover, Table } from "keep-react";
import {
  ArrowDown,
  Cube,
  DotsThreeOutline,
  Pencil,
  Trash,
} from "phosphor-react";

export const TableComponent = () => {
  return (
    <Table showCheckbox={true}>
      <Table.Caption>
        <div className="my-5 flex items-center px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">
              Componentes utilizados
            </p>
            {/* <Badge size="sm" color="secondary">
              100 Member
            </Badge> */}
          </div>
          <div className="flex ml-5 items-center gap-5">
            <Button variant="outline" size="sm">
              <span className="pr-2">
                <Cube size={24} />
              </span>
              Registrar Consumo
            </Button>
            <Button variant="outline" size="sm">
              <span className="pr-2">
                <Cube size={24} />
              </span>
              Buscar
            </Button>
          </div>
        </div>
      </Table.Caption>
      <Table.Head>
        <Table.HeadCell className="min-w-[290px]">
          <p className="text-body-5 font-medium text-metal-400">Type</p>
        </Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell className="min-w-[152px]">Role</Table.HeadCell>
        <Table.HeadCell className="min-w-[240px]">Email Address</Table.HeadCell>
        <Table.HeadCell className="min-w-[215px]">Team</Table.HeadCell>
        <Table.HeadCell className="min-w-[200px]">Performance</Table.HeadCell>
        <Table.HeadCell className="min-w-[100px]" />
      </Table.Head>
      <Table.Body className="divide-gray-25 divide-y">
        <Table.Row className="bg-white">
          <Table.Cell>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* <Avatar img="/images/avatar/avatar-4.png" /> */}
                  <div>
                    <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                      Ralph Edwards
                    </p>
                    <span>&ralph</span>
                  </div>
                </div>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            <Badge color="success" showIcon={true}>
              Active
            </Badge>
          </Table.Cell>
          <Table.Cell>
            <p>UI/UX Designer</p>
          </Table.Cell>
          <Table.Cell>nevaeh.simmons@example.com</Table.Cell>
          <Table.Cell>
            <div className="flex items-center gap-1">
              <Badge>Product</Badge>
              <Badge>Marketing</Badge>
              <Badge color="secondary">+3</Badge>
            </div>
          </Table.Cell>
          <Table.Cell>
            <div className="flex items-center gap-3">
              <div>
                {/* <Image
                  src="/images/icon/Series.png"
                  width={72}
                  height={36}
                  alt="line"
                /> */}
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <ArrowDown size={20} color="#D7DFE9" />
                </span>
                <span>20%</span>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            <Button variant="outline" size="sm" shape="circle">
              <DotsThreeOutline size={15} />
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
