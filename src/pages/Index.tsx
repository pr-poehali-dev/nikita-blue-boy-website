import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [comments, setComments] = useState<Array<{ name: string; text: string; story: string }>>([]);
  const [commentForm, setCommentForm] = useState({ name: '', text: '', story: '' });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCommentSubmit = (storyId: string) => {
    if (commentForm.name && commentForm.text) {
      setComments([...comments, { ...commentForm, story: storyId }]);
      setCommentForm({ name: '', text: '', story: '' });
    }
  };

  const stories = [
    {
      id: 'story1',
      title: 'История про контрольную',
      content: 'Никита списывал на контрольной и не дал списать другим. Когда его спросили, он сказал "Я сам решал!" Но учительница всё видела.'
    },
    {
      id: 'story2',
      title: 'Случай в столовой',
      content: 'Никита влез без очереди в столовой и съел чужую котлету. Когда его спросили, он сказал что это была его котлета, хотя все видели обратное.'
    },
    {
      id: 'story3',
      title: 'Футбол во дворе',
      content: 'Никита играл в футбол и забил мячом в окно соседу. Потом он сказал что это сделал кто-то другой, но камера всё записала.'
    }
  ];

  const proofs = [
    'Свидетельские показания одноклассников',
    'Видеозаписи с камер наблюдения',
    'Фотографии с места происшествий',
    'Письменные жалобы соседей'
  ];

  const faqItems = [
    { q: 'Почему Никита белобрысый?', a: 'Потому что у него светлые волосы с рождения. Это не его вина, но вот поведение - совсем другое дело.' },
    { q: 'Что Никита сделал плохого?', a: 'Множество вещей: обманывал, воровал еду, портил имущество, не признавал свои ошибки.' },
    { q: 'Можно ли Никите исправиться?', a: 'Конечно! Каждый человек может стать лучше, если захочет. Но пока что Никита не показывает желания меняться.' },
    { q: 'Как с этим бороться?', a: 'Честно говорить правду, не давать врать безнаказанно и надеяться что он когда-нибудь одумается.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white border-b border-black z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">НИКИТА</h1>
            <div className="flex gap-8">
              <button onClick={() => scrollToSection('main')} className="text-sm font-medium hover:opacity-50 transition-opacity">Главная</button>
              <button onClick={() => scrollToSection('proofs')} className="text-sm font-medium hover:opacity-50 transition-opacity">Доказательства</button>
              <button onClick={() => scrollToSection('stories')} className="text-sm font-medium hover:opacity-50 transition-opacity">Истории</button>
              <button onClick={() => scrollToSection('gallery')} className="text-sm font-medium hover:opacity-50 transition-opacity">Галерея</button>
              <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-50 transition-opacity">FAQ</button>
            </div>
          </div>
        </div>
      </nav>

      <section id="main" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl animate-fade-in">
            <h2 className="text-7xl font-bold mb-6 leading-tight">Почему Никита белобрысый плохой мальчик</h2>
            <p className="text-2xl text-muted mb-8 leading-relaxed">
              Документальное исследование о поведении Никиты и его влиянии на окружающих
            </p>
            <Button onClick={() => scrollToSection('proofs')} size="lg" className="h-12 px-8 text-base">
              Смотреть доказательства
            </Button>
          </div>
        </div>
      </section>

      <section id="proofs" className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">Доказательства</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proofs.map((proof, idx) => (
              <Card key={idx} className="p-8 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <Icon name="FileText" size={24} className="mt-1 flex-shrink-0" />
                  <p className="text-lg font-medium">{proof}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">Истории</h2>
          <div className="space-y-8">
            {stories.map((story) => (
              <Card key={story.id} className="p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                <p className="text-lg mb-6 text-muted leading-relaxed">{story.content}</p>
                
                <div className="border-t-2 border-black pt-6 mt-6">
                  <h4 className="text-xl font-bold mb-4">Комментарии</h4>
                  
                  <div className="space-y-4 mb-6">
                    {comments.filter(c => c.story === story.id).map((comment, idx) => (
                      <div key={idx} className="border-l-4 border-black pl-4 py-2">
                        <p className="font-bold text-sm mb-1">{comment.name}</p>
                        <p className="text-muted">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Ваше имя"
                      value={commentForm.story === story.id ? commentForm.name : ''}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value, story: story.id })}
                      className="border-2 border-black"
                    />
                    <Textarea
                      placeholder="Ваш комментарий"
                      value={commentForm.story === story.id ? commentForm.text : ''}
                      onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value, story: story.id })}
                      className="border-2 border-black min-h-24"
                    />
                    <Button onClick={() => handleCommentSubmit(story.id)} className="w-full">
                      Отправить комментарий
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">Галерея</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="aspect-square bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300">
                <Icon name="Image" size={48} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12">FAQ</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-2 border-black px-6">
                <AccordionTrigger className="text-xl font-bold hover:no-underline py-6">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t-2 border-black py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted text-lg">© 2024 Документация о Никите. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
