'use client';
import { useState, FormEvent } from "react";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify"; // Replace with shadcn toast if available
import { Plus } from "lucide-react";

export const AddTask = () => {
  const [taskContent, setTaskContent] = useState("");
  const { addTask, isLoading, isConnected } = useWeb3();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskContent.trim()) return;

    setError(null);

    try {
      await addTask(taskContent);
      setTaskContent("");
      toast.success("Task added successfully!");
    } catch (error) {
      setError("Failed to add task. Please try again.");
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-6 sm:flex-row sm:gap-4 sm:mt-6"
      aria-label="Add new task"
    >
      <Input
        type="text"
        placeholder={isConnected ? "What needs to be done?" : "Connect your wallet first"}
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        disabled={!isConnected || isLoading}
        aria-label="Task description"
        className="
          flex-1 px-4 py-3
          bg-white/50 backdrop-blur-md border border-blue-200
          text-blue-900 placeholder-blue-400
          focus:ring-2 focus:ring-orange-300 focus:border-orange-300
          rounded-xl shadow-sm transition-all duration-300
          disabled:bg-orange-50 disabled:text-orange-700 disabled:cursor-not-allowed
        "
      />

      <Button
        type="submit"
        disabled={!isConnected || isLoading || !taskContent.trim()}
        aria-label="Add task"
        className="
          bg-blue-600 hover:bg-orange-400
          text-white font-semibold py-3 px-6 rounded-xl
          transition-all duration-300
          disabled:opacity-50 disabled:hover:bg-blue-600
          group flex items-center gap-2
        "
      >
        {isLoading ? (
          <>
            <span className="animate-spin">↻</span>
            Adding...
          </>
        ) : (
          <>
            <Plus className="w-5 h-5 text-orange-300 group-hover:text-white transition-colors" />
            Add Task
          </>
        )}
      </Button>
    </form>
  );
};
