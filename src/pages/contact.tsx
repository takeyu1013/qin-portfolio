import type { NextPage } from "next";

import {
  Center,
  Divider,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";

import { Button, useMediaQuery } from "src/lib/mantine";
import { useState } from "react";

const Contact: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const largerThanXs = useMediaQuery("sm");

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
    errorMessages: {
      email: "Invalid email",
    },
  });
  const [visible, setVisible] = useState(false);

  return (
    <form
      className="flex justify-center"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!form.validate()) {
          form.errors;
          return;
        }
        setVisible(true);
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(form.values),
        });
        form.reset();
        setVisible(false);
      }}
    >
      <Stack
        px={16}
        py={40}
        className="max-w-5xl flex-auto"
        style={{ minHeight: largerThanXs ? 638 : 596 }}
      >
        <LoadingOverlay visible={visible} />
        <Title order={2}>Contact</Title>
        <Divider />
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          required
          label="Name"
          placeholder="Taro Yamada"
          {...form.getInputProps("name")}
        />
        <Textarea
          required
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
