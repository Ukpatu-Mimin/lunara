import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Mic, Play, Pause, Trash2, Camera, Plus, Music, HelpCircle, Heart, X } from 'lucide-react';
import { Memory } from '../types';

interface MemoryVaultProps {
  memories: Memory[];
  addMemory: (mem: Memory) => void;
  deleteMemory: (id: string) => void;
}

export default function MemoryVault({ memories, addMemory, deleteMemory }: MemoryVaultProps) {
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [recordIntervalId, setRecordIntervalId] = useState<any>(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=300');

  // AI Narrative states
  const [activeNarrativeMemId, setActiveNarrativeMemId] = useState<string | null>(null);
  const [activeNarrativeText, setActiveNarrativeText] = useState<string | null>(null);
  const [isNarratingLoading, setIsNarratingLoading] = useState(false);

  const handleGenerateNarrative = async (mem: Memory) => {
    setActiveNarrativeMemId(mem.id);
    setIsNarratingLoading(true);
    setActiveNarrativeText(null);
    try {
      const response = await fetch('/api/narrate-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: mem.title,
          date: mem.date,
          recipientName: mem.recipientName,
          description: mem.description
        })
      });
      if (response.ok) {
        const data = await response.json();
        setActiveNarrativeText(data.narrative);
      } else {
        throw new Error('Failed to narrate');
      }
    } catch (err) {
      console.error(err);
      setActiveNarrativeText(`An eternal moment captured on the golden day of ${mem.date}.\nThe air was sweet with laughter for beloved ${mem.recipientName},\nAnd in the archive of our hearts, "${mem.title}" remains forever engraved.`);
    } finally {
      setIsNarratingLoading(false);
    }
  };

  const imagePresets = [
    { label: 'Sunset Proposal', url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=300' },
    { label: 'Room Decor Setup', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=300' },
    { label: 'Lover’s Rose', url: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=300' },
    { label: 'Celebration Toast', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=300' }
  ];

  const handleStartRecord = () => {
    setIsRecording(true);
    setRecordTimer(0);
    const id = setInterval(() => {
      setRecordTimer(prev => prev + 1);
    }, 1000);
    setRecordIntervalId(id);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    clearInterval(recordIntervalId);
    setRecordIntervalId(null);
  };

  const handleCreateMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRecipient.trim() || !newDate) return;

    const newMem: Memory = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      date: newDate,
      recipientName: newRecipient,
      description: newDesc,
      image: newImage,
      // If recorded, attach a mock voice note duration marker
      voiceNoteUrl: recordTimer > 0 ? `Mock audio - 0:${recordTimer.toString().padStart(2, '0')}` : undefined
    };

    addMemory(newMem);
    setNewTitle('');
    setNewRecipient('');
    setNewDate('');
    setNewDesc('');
    setRecordTimer(0);
    alert('Your beautiful surprise memory is now locked safely inside Lunara’s Memory Vault!');
  };

  const toggleMockAudio = (id: string) => {
    if (isPlayingId === id) {
      setIsPlayingId(null);
    } else {
      setIsPlayingId(id);
      // Automatically turn off playing state after 5 seconds to simulate playback completion
      setTimeout(() => {
        setIsPlayingId(prev => prev === id ? null : prev);
      }, 5000);
    }
  };

  return (
    <div id="lunara-memory-vault" className="py-12 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">Bespoke Scrapbook</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-900 mt-1">Lunara Memory Vault</h1>
          <p className="text-stone-500 mt-3 text-sm leading-relaxed">
            Preserve unforgettable milestones forever. Store photos, log previous surprises, save anniversary milestones, and record specialized audio voice messages as digital keepsakes.
          </p>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Create Scrapbook Memory Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm">
            <h3 className="font-serif text-xl font-light text-stone-900 mb-2 flex items-center gap-1.5">
              <Plus className="h-5 w-5 text-amber-600" /> Capture New Memory
            </h3>
            <p className="text-stone-400 text-xs mb-6">Archive a private, beautiful milestone so you never forget the moment.</p>

            <form onSubmit={handleCreateMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. The Lakeside Teepee Proposal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Sarah"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Date Occurred</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none bg-stone-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Memory Scrapbook Photo Preset</label>
                <div className="grid grid-cols-4 gap-2">
                  {imagePresets.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setNewImage(img.url)}
                      className={`h-14 rounded-lg overflow-hidden border-2 cursor-pointer transition-all relative ${
                        newImage === img.url ? 'border-amber-500 shadow' : 'border-stone-200'
                      }`}
                    >
                      <img src={img.url} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/10 hover:bg-transparent" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Description / Memory Diary Note</label>
                <textarea
                  rows={3}
                  placeholder="Describe the look on their face, the weather, what cakes they enjoyed, and what made this surprise special..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50"
                />
              </div>

              {/* Mock Voice Note Recorder */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-2">Record Voice Note Keepsake</label>
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={isRecording ? handleStopRecord : handleStartRecord}
                      className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                        isRecording
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950'
                      }`}
                    >
                      <Mic className="h-4.5 w-4.5" />
                    </button>
                    <div>
                      <span className="text-xs font-bold text-stone-800">
                        {isRecording ? 'Recording keepsakes...' : 'Record Voice Message'}
                      </span>
                      <span className="block text-[10px] text-stone-400 font-mono">
                        {isRecording ? `Duration: 0:${recordTimer.toString().padStart(2, '0')}` : 'Save sound notes'}
                      </span>
                    </div>
                  </div>

                  {recordTimer > 0 && !isRecording && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-700">
                      <Music className="h-3 w-3" /> Voice Clip Saved
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 text-xs font-bold transition-all"
              >
                Save To Vault
              </button>
            </form>
          </div>

          {/* Polaroid Scrapbook Gallery Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm min-h-[400px]">
            <h3 className="font-serif text-xl font-light text-stone-900 mb-6 flex items-center gap-1.5">
              <Sparkles className="h-5 w-5 text-amber-500" /> Polaroid Keepsake Scrapbook ({memories.length})
            </h3>

            {memories.length === 0 ? (
              <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                <Camera className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                <h4 className="font-serif text-base text-stone-700">Your Memory Vault is pristine</h4>
                <p className="text-stone-400 text-xs mt-1 max-w-xs mx-auto">Lock your anniversaries and photos to create a gorgeous digital timeline!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {memories.map((mem) => {
                  const isPlaying = isPlayingId === mem.id;
                  return (
                    <motion.div
                      key={mem.id}
                      whileHover={{ scale: 1.02, rotate: -1 }}
                      className="bg-stone-50 border border-stone-200 p-4 pb-6 rounded shadow-lg flex flex-col justify-between max-w-[280px] mx-auto relative group"
                    >
                      {/* Photo slot */}
                      <div className="w-full h-44 bg-stone-200 overflow-hidden relative border border-stone-250">
                        {mem.image ? (
                          <img src={mem.image} alt={mem.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="h-full w-full bg-stone-300 flex items-center justify-center"><Camera className="h-6 w-6 text-stone-500" /></div>
                        )}
                        <button
                          onClick={() => deleteMemory(mem.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black text-white sm:opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Polaroid notes */}
                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                          <span>{mem.date}</span>
                          <span>For {mem.recipientName}</span>
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-stone-900 leading-tight">{mem.title}</h4>
                        <p className="text-[11px] text-stone-500 font-light leading-relaxed line-clamp-3">
                          "{mem.description}"
                        </p>

                        <button
                          type="button"
                          onClick={() => handleGenerateNarrative(mem)}
                          className="w-full mt-2.5 py-1 px-3 border border-amber-500/25 hover:bg-amber-500/10 text-amber-800 text-[10px] font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
                        >
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          <span>AI Literary Poem Keepsake</span>
                        </button>

                        {/* Interactive Simulated Voice player if present */}
                        {mem.voiceNoteUrl && (
                          <div className="mt-3 pt-3 border-t border-stone-200/60 flex items-center gap-2 justify-between">
                            <button
                              onClick={() => toggleMockAudio(mem.id)}
                              className="h-7 w-7 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center shrink-0 hover:bg-amber-500 hover:text-stone-900 transition-colors"
                            >
                              {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 pl-0.5" />}
                            </button>
                            {/* Animated sound waves */}
                            <div className="flex-1 flex gap-0.5 items-end h-4 overflow-hidden pr-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => {
                                const heightClass = isPlaying
                                  ? bar % 3 === 0 ? 'h-3 animate-pulse' : bar % 2 === 0 ? 'h-4 animate-bounce' : 'h-2'
                                  : 'h-1.5';
                                return (
                                  <div key={bar} className={`w-1 bg-amber-500 rounded-full transition-all duration-300 ${heightClass}`} />
                                );
                              })}
                            </div>
                            <span className="text-[9px] font-mono font-bold text-stone-400 shrink-0">
                              {isPlaying ? '0:05' : 'Play Clip'}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* AI Narrative Parchment Modal */}
      {activeNarrativeMemId && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fcfaf5] border-4 border-[#e6d9b8] rounded-3xl max-w-lg w-full shadow-2xl p-8 text-[#4a3f2d] relative overflow-hidden font-serif">
            {/* Elegant luxury borders */}
            <div className="absolute inset-2 border border-[#e6d9b8]/50 rounded-2xl pointer-events-none" />
            
            <button
              onClick={() => {
                setActiveNarrativeMemId(null);
                setActiveNarrativeText(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {isNarratingLoading ? (
              <div className="py-20 text-center space-y-4">
                <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <span className="text-xs font-mono tracking-widest text-stone-500 uppercase block">Gemini is writing bespoke prose...</span>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <div className="text-xs font-mono tracking-widest text-amber-600 uppercase font-semibold">
                  Lunara Literary Archive
                </div>
                
                <h3 className="text-2xl font-light tracking-wide text-stone-850 border-b border-[#e6d9b8] pb-3">
                  {memories.find(m => m.id === activeNarrativeMemId)?.title}
                </h3>

                <div className="py-4 whitespace-pre-line text-sm leading-relaxed italic text-[#5c4e36] font-light max-h-[300px] overflow-y-auto pr-2 px-1">
                  {activeNarrativeText}
                </div>

                <div className="border-t border-[#e6d9b8] pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Scribed Live &bull; {memories.find(m => m.id === activeNarrativeMemId)?.date}
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-1.5 bg-[#4a3f2d] hover:bg-[#3d3324] text-[#fcfaf5] rounded-full text-xs font-semibold transition-colors shadow-md"
                  >
                    Print Keepsake
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
