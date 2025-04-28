'use client'

import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Check, RefreshCcw, ClipboardList } from "lucide-react";

export const TaskList = () => {
  const { tasks, toggleTask, isLoading, isConnected, pendingTx, loadTasks } = useWeb3();

  const handleToggle = async (id) => {
    await toggleTask(id);
  };

  if (!isConnected) {
    return (
      <div className="mt-8 text-center">
        <p className="text-blue-400">Connect your wallet to see your tasks</p>
      </div>
    );
  }

  if (isLoading && tasks.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-center text-blue-400">Loading tasks...</p>
        <div className="mt-4 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-white/50 backdrop-blur-md animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mt-8 px-2 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-blue-800 tracking-tight">Your Tasks</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={loadTasks}
          disabled={isLoading}
          className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
          aria-label="Refresh task list"
        >
          <RefreshCcw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
      <hr className="mb-6 border-blue-100" />

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center text-center py-8">
          <ClipboardList className="w-8 h-8 mb-2 text-blue-200" />
          <p className="text-blue-400">No tasks yet. Add your first task above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`
                transition-all
                bg-white/60 backdrop-blur-md border
                ${task.completed ? 'border-orange-200' : 'border-blue-100'}
                shadow-md rounded-2xl hover:shadow-lg hover:scale-[1.01] duration-200
              `}
            >
              <CardContent className="px-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggle(task.id)}
                    disabled={isLoading || pendingTx !== null}
                    aria-checked={task.completed}
                    aria-label={`Mark task "${task.content}" as ${task.completed ? "incomplete" : "complete"}`}
                    className={`
                      h-5 w-5 border-blue-400 transition
                      ${task.completed ? 'bg-orange-400 border-orange-400 animate-pulse' : 'bg-white'}
                      focus:ring-2 focus:ring-orange-400
                      disabled:opacity-60 disabled:cursor-not-allowed
                    `}
                  />
                  <span
                    className={`flex-1 text-base font-medium ${
                      task.completed
                        ? 'line-through text-orange-400'
                        : 'text-blue-900'
                    }`}
                  >
                    {task.content}
                  </span>
                  {task.completed && (
                    <span className="text-orange-500 bg-orange-100 rounded-full p-1 animate-fade-in">
                      <Check size={18} />
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pendingTx && (
        <div className="mt-4 p-3 rounded-xl bg-orange-50 text-sm border border-orange-300 shadow-md" aria-live="polite">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-700 font-medium">Transaction pending...</span>
          </div>
          <a
            href={`https://mumbai.polygonscan.com/tx/${pendingTx}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs mt-1 block"
            aria-label="View transaction on PolygonScan"
          >
            View on explorer
          </a>
        </div>
      )}
    </section>
  );
};
