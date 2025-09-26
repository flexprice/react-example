import React, { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { Loader2, Send, CheckCircle, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LLMUsageSimulator: React.FC = () => {
    const [isSending, setIsSending] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [sentCount, setSentCount] = useState(0);

    const handleSendUsage = async () => {
        setIsSending(true);
        setIsCompleted(false);
        setSentCount(0);

        // Simulate sending 10 LLM usage events
        for (let i = 1; i <= 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
            setSentCount(i);
        }

        setIsSending(false);
        setIsCompleted(true);

        // Reset after 3 seconds
        setTimeout(() => {
            setIsCompleted(false);
            setSentCount(0);
        }, 3000);
    };

    return (
        <Card className="p-6 border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">LLM Usage Simulator</h3>
                    <p className="text-sm text-slate-600">Test your usage-based billing system</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSending ? (
                    <motion.div
                        key="sending"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative">
                                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-medium text-slate-900">Sending LLM Events</p>
                                <p className="text-sm text-slate-600">{sentCount}/10 events processed</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Progress</span>
                                <span>{Math.round((sentCount / 10) * 100)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(sentCount / 10) * 100}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-white/50 rounded-lg p-3">
                                <p className="text-2xl font-bold text-blue-600">{sentCount}</p>
                                <p className="text-xs text-slate-600">Events Sent</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-3">
                                <p className="text-2xl font-bold text-purple-600">{10 - sentCount}</p>
                                <p className="text-xs text-slate-600">Remaining</p>
                            </div>
                        </div>
                    </motion.div>
                ) : isCompleted ? (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center space-y-6"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-green-100 rounded-full">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xl font-semibold text-slate-900">Events Sent Successfully!</p>
                                <p className="text-slate-600">10 LLM usage events have been processed</p>
                            </div>
                        </div>

                        <div className="bg-white/50 rounded-lg p-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-2xl font-bold text-green-600">10</p>
                                    <p className="text-xs text-slate-600">Events</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">2.1s</p>
                                    <p className="text-xs text-slate-600">Duration</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-purple-600">100%</p>
                                    <p className="text-xs text-slate-600">Success</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleSendUsage}
                            variant="outline"
                            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                        >
                            <Send className="h-4 w-4 mr-2" /> Send Again
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="initial"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <p className="text-slate-600 mb-2">Simulate LLM usage events to test your billing system</p>
                            <p className="text-sm text-slate-500">This will send 10 sample events with different usage patterns</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-white/50 rounded-lg p-4">
                                <Zap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-900">10 Events</p>
                                <p className="text-xs text-slate-600">Sample data</p>
                            </div>
                            <div className="bg-white/50 rounded-lg p-4">
                                <Activity className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-900">Real-time</p>
                                <p className="text-xs text-slate-600">Live processing</p>
                            </div>
                        </div>

                        <Button
                            onClick={handleSendUsage}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <Send className="h-4 w-4 mr-2" /> Start Simulation
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

export default LLMUsageSimulator;
