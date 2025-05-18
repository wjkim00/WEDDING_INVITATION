import React, { useRef, useState, useEffect } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import song from '../assets/song.mp3';

export default function SpeakerTogglePlayer() {
    const audioRef = useRef(null);
    const [muted, setMuted] = useState(true);

    // 마운트 시: 무음 상태로 우선 재생 시도
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = true;
      audio.play()
        .then(() => {
          // 무음 재생 성공 시 언뮤트 상태로 전환하여 재생 유지
          setMuted(false);
        })
        .catch(err => {
          console.warn('Mount auto-play failed, staying muted:', err);
          setMuted(true);
        });
    }, []);

    // muted 상태가 변경될 때 audio에 반영하고,
    // 언뮤트: play(), mute: pause() (재생 위치 유지)
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = muted;
      if (!muted) {
        audio.play().catch(err => console.warn('Playback failed:', err));
      } else {
        audio.pause();
      }
    }, [muted]);

    const toggleMute = () => setMuted(prev => !prev);

  // 버튼 인라인 스타일 정의
  const buttonStyle = {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    zIndex: 1000,
    padding: '0.4rem',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: muted ? '#fff' : '#007BFF',
    color: muted ? '#333' : '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s'
  };

  return (
    <>
      <button
        onClick={toggleMute}
        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
        style={buttonStyle}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        {muted ? <FaVolumeMute size={'.9rem'} /> : <FaVolumeUp size={'.9rem'} />}
      </button>
      <audio ref={audioRef} src={song} preload="auto" style={{ display: 'none' }} />
    </>
  );
}
