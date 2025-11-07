import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface User {
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  balance: number;
  currency: string;
  currencySymbol: string;
}

interface DashboardStats {
  adsWatched: number;
  adsTotal: number;
  totalReferrals: number;
}

type NavItem = 'Home' | 'Support' | 'Tasks' | 'Withdraw';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  user = signal<User>({
    name: 'Salman Ahmed',
    avatarUrl: 'https://picsum.photos/id/237/100/100',
    isVerified: true,
    balance: 45,
    currency: 'টাকা',
    currencySymbol: '💰',
  });

  stats = signal<DashboardStats>({
    adsWatched: 0,
    adsTotal: 10,
    totalReferrals: 0,
  });

  referralLink = signal<string>('https://t.me/Red_Chilii_bot/app?startapp=');

  copyStatus = signal<'idle' | 'copied'>('idle');

  activeNav = signal<NavItem>('Home');

  copyReferralLink(): void {
    navigator.clipboard.writeText(this.referralLink()).then(() => {
      this.copyStatus.set('copied');
      setTimeout(() => {
        this.copyStatus.set('idle');
      }, 2000);
    });
  }

  shareNow(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Join and Earn!',
        text: 'Check out this awesome app and earn rewards!',
        url: this.referralLink(),
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyReferralLink();
      alert('Share API not supported. Link copied to clipboard instead!');
    }
  }

  setActiveNav(item: NavItem): void {
    this.activeNav.set(item);
  }
}
