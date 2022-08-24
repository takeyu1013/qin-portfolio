import type { NextPage } from "next";

import {
  Box,
  Center,
  Divider,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { Button } from "src/lib/mantine";
import { useForm } from "@mantine/hooks";

const Contact: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
  });

  return (
    <form
      className="flex justify-center"
      onSubmit={async (event) => {
        event.preventDefault();
        const data = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(form.values),
        });
        console.log(data);
      }}
    >
      <Stack px={16} py={40} className="max-w-5xl flex-auto">
        <Title order={2}>Contact</Title>
        <Divider />
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Name"
          placeholder="Taro Yamada"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Your message"
          placeholder="I want to order your goods"
          {...form.getInputProps("message")}
        />
        <Center>
          <Button
            type="submit"
            color="dark"
            variant={colorScheme === "dark" ? "white" : "filled"}
            radius="xl"
          >
            Send message
          </Button>
        </Center>
      </Stack>
    </form>
  );
};

export default Contact;
