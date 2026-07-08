'use client';
import { useI18n } from "@surgeteam/i18n/use-i18n";
import z from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@surgeteam/design-system/components/ui/dialog"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@surgeteam/design-system/components/ui/select";
import { Input } from "@surgeteam/design-system/components/ui/input";
import { Button } from "@surgeteam/design-system/components/ui/button";
import { Calendar } from "@surgeteam/design-system/components/ui/calendar";
import { Checkbox } from "@surgeteam/design-system/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@surgeteam/design-system/components/ui/form";

function buildSchema(t: (key: string) => string) {
  return z.object({
    todo: z.string().trim().min(1, t("todolists.validationTodo")),
    priority: z.enum(["high", "medium", "low"]),
    deadline: z.date().optional(),
    completed: z.boolean(),
  });
}

export type TodoFormValues = z.infer<ReturnType<typeof buildSchema>>;

const DEFAULT_VALUES: TodoFormValues = {
  todo: "",
  priority: "medium",
  deadline: undefined,
  completed: false,
}

type TodoFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues?: Partial<TodoFormValues>;
  submitting?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TodoFormValues) => void;
};

export function TodoFormDialog({
  open,
  mode,
  initialValues,
  submitting = false,
  onOpenChange,
  onSubmit,
}: TodoFormDialogProps) {
  const {t} = useI18n();
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(buildSchema(t)),
    defaultValues: DEFAULT_VALUES,
  });

useEffect(() => {
  if (!open) return;
  form.reset({...DEFAULT_VALUES, ...initialValues});
}, [form, open]);

return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{mode === "create" ? t("todolists.addTodo") : t("todolists.editTodo")}</DialogTitle>
        <DialogDescription>{mode === "create" ? t("todolists.addTodoDescription") : t("todolists.editTodoDescription")}</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("todolists.fieldTodo")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("todolists.todoPlaceholder")} className="w-full" disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("todolists.fieldPriority")}</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange} disabled={submitting}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high">{t("todolists.priorityHigh")}</SelectItem>
                      <SelectItem value="medium">{t("todolists.priorityMedium")}</SelectItem>
                      <SelectItem value="low">{t("todolists.priorityLow")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("todolists.fieldDeadline")}</FormLabel>
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={submitting} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("todolists.fieldCompleted")}</FormLabel>
                  <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} disabled={submitting} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full">
            {mode === "create" ? t("todolists.submitButton") : t("todolists.updateButton")}
          </Button>

          <Button type="button" variant="outline" disabled={submitting} className="w-full" onClick={() => onOpenChange(false)}>
            {t("todolists.cancelButton")}
          </Button>

        </form>
      </Form>
    </DialogContent>
  </Dialog>

)
}