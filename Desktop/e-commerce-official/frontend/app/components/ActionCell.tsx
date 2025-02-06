// components/cells/ActionCell.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { revalidatePaths, revalidateTags } from "@/app/actions/Revalidate";
import { useToast } from "@/hooks/use-toast";

interface ActionsCellProps<T> {
  entityType: string;
  entityId: string;
  onDelete?: (id: string) => Promise<void>;
  editPath?: string;
  variantPath?: string;
}

export function ActionsCell<T>({ entityType, entityId, onDelete, editPath, variantPath }: ActionsCellProps<T>) {
  const router = useRouter();
  const { toast } = useToast();
  const handleEdit = () => {
    if (editPath) {
      router.push(editPath);
    } else {
      router.push(`/dashboard/${entityType}/${entityId}/edit`);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      const res = await onDelete(entityId);
      router.refresh();
      console.log(res);
      toast({
        title: "Deleted",
        description: `${entityType} has been deleted.`,
        variant: "default",
      });
      revalidateTags([`${entityType}s`, `${entityType}s1`]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          {variantPath && (
            <DropdownMenuItem onClick={() => router.push(variantPath)}>
              <Edit className="mr-2 h-4 w-4" />
              Variants
            </DropdownMenuItem>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-destructive">Delete</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the {entityType}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
