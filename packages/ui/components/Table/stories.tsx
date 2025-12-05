import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './';

const meta = {
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Row 1, Cell 1</TableCell>
          <TableCell>Row 1, Cell 2</TableCell>
          <TableCell>Row 1, Cell 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Row 2, Cell 1</TableCell>
          <TableCell>Row 2, Cell 2</TableCell>
          <TableCell>Row 2, Cell 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Row 3, Cell 1</TableCell>
          <TableCell>Row 3, Cell 2</TableCell>
          <TableCell>Row 3, Cell 3</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Widget A</TableCell>
          <TableCell>2</TableCell>
          <TableCell>$10.00</TableCell>
          <TableCell>$20.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget B</TableCell>
          <TableCell>1</TableCell>
          <TableCell>$15.00</TableCell>
          <TableCell>$15.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget C</TableCell>
          <TableCell>3</TableCell>
          <TableCell>$8.00</TableCell>
          <TableCell>$24.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell>$59.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>Monthly Sales Report - Q1 2024</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Growth</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>January</TableCell>
          <TableCell>$12,500</TableCell>
          <TableCell>+5%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>February</TableCell>
          <TableCell>$13,200</TableCell>
          <TableCell>+8%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>March</TableCell>
          <TableCell>$14,100</TableCell>
          <TableCell>+12%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Complete: Story = {
  render: () => (
    <Table>
      <TableCaption>Employee Directory</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Salary</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>001</TableCell>
          <TableCell>Alice Johnson</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>$95,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>002</TableCell>
          <TableCell>Bob Williams</TableCell>
          <TableCell>Marketing</TableCell>
          <TableCell>$75,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>003</TableCell>
          <TableCell>Carol Davis</TableCell>
          <TableCell>Sales</TableCell>
          <TableCell>$80,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>004</TableCell>
          <TableCell>David Brown</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>$100,000</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Average Salary</TableCell>
          <TableCell>$87,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WideTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Team Size</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Website Redesign</TableCell>
          <TableCell>In Progress</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell>2024-04-30</TableCell>
          <TableCell>5</TableCell>
          <TableCell>$50,000</TableCell>
          <TableCell>65%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mobile App</TableCell>
          <TableCell>Planning</TableCell>
          <TableCell>2024-03-01</TableCell>
          <TableCell>2024-08-31</TableCell>
          <TableCell>8</TableCell>
          <TableCell>$120,000</TableCell>
          <TableCell>10%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>API Integration</TableCell>
          <TableCell>Completed</TableCell>
          <TableCell>2024-01-01</TableCell>
          <TableCell>2024-02-28</TableCell>
          <TableCell>3</TableCell>
          <TableCell>$25,000</TableCell>
          <TableCell>100%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const EmptyTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center text-muted-foreground">
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
