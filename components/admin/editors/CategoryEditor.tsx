"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const initialCategories: Category[] = [
  { id: "web-dev", title: "Web Development", description: "Learn HTML, CSS, JS & React", icon: "Code2" },
  { id: "ui-ux", title: "UI / UX Design", description: "Design beautiful interfaces", icon: "Palette" },
];

export function CategoryEditor() {
  const [categories, setCategories] = useState(initialCategories);

  const updateCategory = (index: number, field: keyof Category, value: string) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { id: "", title: "", description: "", icon: "" }]);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {categories.map((cat, i) => (
        <div key={i} className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl">
          <Label>Category ID</Label>
          <Input
            value={cat.id}
            onChange={(e) => updateCategory(i, "id", e.target.value)}
            placeholder="web-dev"
            className="mb-3"
          />

          <Label>Title</Label>
          <Input
            value={cat.title}
            onChange={(e) => updateCategory(i, "title", e.target.value)}
            className="mb-3"
          />

          <Label>Description</Label>
          <Textarea
            value={cat.description}
            onChange={(e) => updateCategory(i, "description", e.target.value)}
            className="mb-3"
          />

          <Label>Icon (lucide-react)</Label>
          <Input
            value={cat.icon}
            onChange={(e) => updateCategory(i, "icon", e.target.value)}
            placeholder="Code2"
          />
        </div>
      ))}

      <Button onClick={addCategory}>➕ Add Category</Button>

      <p className="text-sm text-zinc-500 mt-2">
        After editing, copy the data manually into <code>categories.ts</code>.
      </p>
    </div>
  );
}
