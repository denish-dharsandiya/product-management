import { render, waitFor, screen } from "@testing-library/react";
import ShowProducts from "../screens/ShowProducts";
import axios from "axios";

jest.mock("axios");

const dummyTodos = [
{
id: 1,
title: "Test Product",
price: 500,
description: "Test",
published: true,
},
{
    id: 2,
    title: "Test1 Product",
    price: 600,
    description: "Test 2",
    published: false,
},
];

test("products list", async () => {
axios.get.mockResolvedValue({ data: dummyTodos });
render(<ShowProducts />);

const productList = await waitFor(() => screen.findAllByTestId("product"));

expect(productList).toHaveLength(2);
});