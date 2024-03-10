import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }

  onNoteDeleted: (id: string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>
        { formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true }) }
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          { note.content }
        </p>
        
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/60'/>
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='size-5'/>
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className='text-sm font-medium text-slate-300'>
              { formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true }) }
            </span>
            <p className='text-sm leading-6 text-slate-400'>
              { note.content }
            </p>
          </div>

          <div className="grid grid-cols-5 grid-flow-col">
            <button
              type='button'
              onClick={() => onNoteDeleted(note.id) }
              className='col-span-4 bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
            >
              Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
            </button>
            <button
              type='button'
              onClick={() => {
                if ('speechSynthesis' in window) {
                  let message = new window.SpeechSynthesisUtterance();
                  const voice = speechSynthesis.getVoices();
                  message.text = note.content;
                  message.lang = 'pt';
                  message.voice = voice[2];
                  window.speechSynthesis.speak(message);
                } else {
                  alert('Desculpe. Seu browser não suporta essa ação.');
                }
              }}
              className='col-span-1 border-l-[1px] border-slate-700 col-span-1 bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
            >
              Play
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  )
}