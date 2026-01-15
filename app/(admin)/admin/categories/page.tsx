"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ListPageHeader } from "@/components/admin/shared";
import { EmptyState } from "@/components/admin/shared";
import { CategoryCard } from "@/components/admin/documents/CategoryCard"; // create a card like CourseCard
import { SearchInput } from "@/components/admin/shared";
import { Category } from "@/components/admin/editors/CategoryEditor";

export default function CategoriesPage() {
  const router = useRouter();
    const [categories, setCategories] = useState<Category[]>(initialCategories
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateCategory = () => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      title: "New Category",
      description: "",
      icon: "",
    };

    setCategories([newCategory, ...categories]);
    router.push(`/admin/categories/${newCategory.id}`);
  };

  // Filter categories by search query
  const filteredCategories = categories.filter((cat) =>
    searchQuery
      ? cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      : true
  );

  if (filteredCategories.length === 0) {
    return (
      <EmptyState
        emoji="📂"
        message="No categories found"
        actionLabel="Create your first category"
        onAction={handleCreateCategory}
        isLoading={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ListPageHeader
        title="Categories"
        description="Organize courses by category"
        actionLabel="New category"
        onAction={handleCreateCategory}
        isLoading={false}
      />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search categories..."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
