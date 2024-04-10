import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Stack,
  Space,
} from "@mantine/core";
import { useState } from "react";

export default function BlogEditModal({ opened, setOpened, fetchBlogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = () => {
    fetch("http://localhost:4000/blog", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((message) => {
      setOpened(false);
      fetchBlogs();
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={setOpened}
        title="Blog"
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Stack>
          <TextInput
            label="Blog Title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Textarea
            autosize
            minRows={10}
            label="Blog content"
            placeholder="Content"
            resize="vertical"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Stack>

        <Space h="md" />

        <Button onClick={onSubmit}>Create</Button>
      </Modal>
    </>
  );
}
